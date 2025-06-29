
import * as THREE from 'three';
import { PointerLockControls } from './controls/PointerLockControls.local.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

// Simple PRNG (Mulberry32)
class PRNG {
    private seed: number;
    constructor(seed: number) {
        this.seed = seed;
    }
    public next(): number { // Returns a float in [0, 1)
        let t = this.seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    public nextInt(min: number, max: number): number { // Returns an int in [min, max] (inclusive)
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    public randFloat(min: number, max: number): number {
        return min + this.next() * (max - min);
    }
}
let prng: PRNG | null = null; // Default PRNG, will be re-seeded for games
let spawnPrng: PRNG | null = null; // Spawn-specific PRNG with offset seed
let currentMapSeed: number | null = null;

// Spawn randomization constants
const SPAWN_SEED_OFFSET_P1 = 12345; // Player 1 spawn seed offset
const SPAWN_SEED_OFFSET_P2 = 54321; // Player 2 spawn seed offset
const SPAWN_SEED_OFFSET_P3 = 98765; // Player 3 spawn seed offset
const SPAWN_SEED_OFFSET_P4 = 13579; // Player 4 spawn seed offset

// Get player-specific spawn seed offset based on client ID hash
function getSpawnSeedOffset(): number {
    if (gameMode === 'singleplayer') {
        return SPAWN_SEED_OFFSET_P1; // Use P1 offset for single player
    }
    
    // For multiplayer, use client ID to determine unique spawn offset
    if (!clientId) return SPAWN_SEED_OFFSET_P1;
    
    // Create a simple hash from client ID to determine player order
    let hash = 0;
    for (let i = 0; i < clientId.length; i++) {
        const char = clientId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    const playerIndex = Math.abs(hash) % 4; // Support up to 4 players
    const offsets = [SPAWN_SEED_OFFSET_P1, SPAWN_SEED_OFFSET_P2, SPAWN_SEED_OFFSET_P3, SPAWN_SEED_OFFSET_P4];
    return offsets[playerIndex];
}


let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: PointerLockControls;
let pitchObject: THREE.Object3D | undefined = undefined; // For camera pitch control

const targetMeshes: Map<string, THREE.Mesh> = new Map();
const targetBoundingBoxCache: Map<string, THREE.Box3> = new Map(); // Cache for performance
interface Projectile {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  lifeTime: number;
  spawnTime: number;
  weaponType: 'handgun' | 'sniper' | 'smg'; // To know which stats to use
  distanceTraveled: number; // Distance traveled in meters for ballistic calculations
  initialPosition: THREE.Vector3; // Starting position for distance calculation
}
const projectiles: Projectile[] = [];

interface RemoteProjectile extends Projectile {}
const remoteProjectiles: RemoteProjectile[] = [];


let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const INPUT_DELAY_MS = 50;

interface PendingInput {
  timestamp: number;
  action: () => void;
}
const pendingInputs: PendingInput[] = [];

let moveForwardActual = false;
let moveBackwardActual = false;
let moveLeftActual = false;
let moveRightActual = false;
let isAimingWithKeyActual = false;
let isAimingWithMouseActual = false;
let isFiringSMGActual = false;

// Bike controls
let bikeAccelerateActual = false;
let bikeDecelerateActual = false;
let bikeTurnLeftActual = false;
let bikeTurnRightActual = false;

// Jump variables
let isOnGround = true;
let verticalVelocity = 0;
let horizontalVelocity = new THREE.Vector3(); // Persistent horizontal momentum

// Bike system
let isOnBike = false;
let bikeModel: THREE.Group | null = null;
let bikeSpeed = 0;
// 1000cc Superbike physics parameters (realistic performance)
let bikeEnginePower = 1000.0; 
let bikeAirDragCoefficient = 0.35; // Realistic aerodynamic coefficient for sports bike
let bikeRollingResistance = 1.5; // Rolling resistance for high-performance tires
let bikeMass = 180.0; // Lightweight superbike + rider (~200kg total, but more responsive)
let bikeBrakingForce = 12000.0; // Racing-grade brakes (extremely powerful)
let bikeTurnSpeed = 4.0;
let bikeDirection = 0; // Bike facing direction in radians
let bikePosition = new THREE.Vector3();
let bikeCanUseWeapons: string[] = ['handgun', 'smg']; // Only handgun and SMG allowed on bike

// Bike damage and collision system
let bikeHealth = 100.0; // Maximum bike durability
let bikeMaxHealth = 100.0;
let bikeLastCollisionTime = 0;
let bikeCollisionCooldown = 100; // ms between collision checks to prevent spam

// Unified function to create bike explosion effect
function createBikeExplosion(position?: THREE.Vector3, enableCameraShake: boolean = true): void {
    if (!scene) return;
    
    // Use provided position or default to bike position
    const explosionPosition = position || bikePosition.clone();
    
    // Create explosion particles
    const particleCount = enableCameraShake ? 50 : 40; // More particles for local explosion
    const particles: THREE.Mesh[] = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.1 + Math.random() * 0.2, 4, 4);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color().setHSL(Math.random() * 0.1, 1, 0.5 + Math.random() * 0.5) // Orange/red colors
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Position at explosion location
        particle.position.copy(explosionPosition);
        particle.position.y += Math.random() * 2;
        
        // Random velocity
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            Math.random() * 15 + 5,
            (Math.random() - 0.5) * 20
        );
        (particle as any).velocity = velocity;
        (particle as any).life = 2.0; // 2 seconds lifetime
        
        particles.push(particle);
        scene.add(particle);
    }
    
    // Animate particles
    const animateExplosion = () => {
        const delta = 0.016; // ~60fps
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            const velocity = (particle as any).velocity;
            let life = (particle as any).life;
            
            // Update position
            particle.position.addScaledVector(velocity, delta);
            
            // Apply gravity
            velocity.y -= 9.8 * delta;
            
            // Fade out
            life -= delta;
            (particle as any).life = life;
            
            if (particle.material instanceof THREE.MeshBasicMaterial) {
                particle.material.opacity = Math.max(0, life / 2.0);
                particle.material.transparent = true;
            }
            
            // Remove dead particles
            if (life <= 0) {
                scene.remove(particle);
                if (particle.geometry) particle.geometry.dispose();
                if (particle.material) (particle.material as THREE.Material).dispose();
                particles.splice(i, 1);
            }
        }
        
        // Continue animation if particles remain
        if (particles.length > 0) {
            requestAnimationFrame(animateExplosion);
        }
    };
    
    animateExplosion();
    
    // Screen shake effect (only for local explosions)
    if (enableCameraShake && camera) {
        const originalPosition = camera.position.clone();
        let shakeTime = 0;
        const shakeDuration = 1.0;
        const shakeIntensity = 0.5;
        
        const shakeCamera = () => {
            if (shakeTime < shakeDuration) {
                shakeTime += 0.016;
                const intensity = shakeIntensity * (1 - shakeTime / shakeDuration);
                
                camera.position.x = originalPosition.x + (Math.random() - 0.5) * intensity;
                camera.position.y = originalPosition.y + (Math.random() - 0.5) * intensity;
                camera.position.z = originalPosition.z + (Math.random() - 0.5) * intensity;
                
                requestAnimationFrame(shakeCamera);
            } else {
                camera.position.copy(originalPosition);
            }
        };
        
        shakeCamera();
    }
    
}

// Function to damage bike
function damageBike(damage: number): void {
    bikeHealth = Math.max(0, bikeHealth - damage);
    
    // Visual feedback for bike damage
    if (bikeModel) {
        bikeModel.traverse((child: any) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                const originalColor = child.material.color.getHex();
                child.material.color.setHex(0xff0000); // Red damage indicator
                setTimeout(() => {
                    if (child && child.material instanceof THREE.MeshStandardMaterial) {
                        child.material.color.setHex(originalColor);
                    }
                }, 200);
            }
        });
    }
    
    // If bike is destroyed
    if (bikeHealth <= 0) {
        
        // Create explosion effect
        createBikeExplosion();
        
        // Player dies from bike explosion
        currentHealth = 0;
        
        // Remove bike from scene and cleanup
        if (bikeModel && bikeModel.parent) {
            scene.remove(bikeModel);
            bikeModel.traverse((child: any) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach((mat: any) => mat.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
            bikeModel = null;
        }
        
        // Force player off bike and reset position
        if (isOnBike) {
            isOnBike = false;
            // Move player to a safe position near explosion
            if (camera && camera.position) {
                camera.position.y = bikePosition.y + PLAYER_HEIGHT;
            }
        }
        
        // Send bike explosion event to other player for visual sync
        if (gameMode === 'multiplayer') {
            sendGameEvent({
                type: 'bike_exploded',
                data: {
                    playerPosition: { x: bikePosition.x, y: bikePosition.y, z: bikePosition.z }
                } as GameEventBikeExplodedData
            });
            
            
        }
        
        // Show death message
        showTemporaryMessage("Bike exploded! You have been killed!", 500);
        
        // Reset bike health for respawn
        bikeHealth = bikeMaxHealth;
        
        // Reset bike position
        bikePosition.set(0, 0, 0);
        
        // Trigger respawn after explosion delay
        setTimeout(() => {
            if (currentHealth <= 0) {
                currentHealth = MAX_HEALTH;
                
                // Ensure player respawns at a different location
                // Use triggerRespawn which handles proper spawn position selection
                // triggerRespawn will be called below, so we don't need to manually set position here
                
                triggerRespawn();
            }
        }, 2000);
    }
}

// Calculate theoretical maximum speed based on engine power and air resistance
function calculateTheoreticalMaxSpeed(): number {
    // Solve: enginePower = airDrag + rollingResistance
    // enginePower = airDragCoeff * v^2 + rollingResistance * v
    // This is a quadratic equation: airDragCoeff * v^2 + rollingResistance * v - enginePower = 0
    const a = bikeAirDragCoefficient;
    const b = bikeRollingResistance;
    const c = -bikeEnginePower;
    
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return 30.0; // Fallback value
    
    const vMax = (-b + Math.sqrt(discriminant)) / (2 * a);
    return Math.max(vMax, 20.0); // Minimum reasonable max speed
}

// Bike banking physics
let bikeBankAngle = 0; // Current bank angle (lean angle) in radians
let targetBankAngle = 0; // Target bank angle when turning
let maxBankAngle = Math.PI / 6; // 30 degrees max lean (back to original)
let bankSpeed = 0.8; // How fast bike leans into turns (even slower)
let bankReturnSpeed = 0.6; // How fast bike returns to upright (even slower)

// Health system
const MAX_HEALTH = 100;

// Zombie system
interface Zombie {
  id: string;
  mesh: THREE.Mesh;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  health: number;
  maxHealth: number;
  speed: number;
  attackRange: number;
  attackDamage: number;
  lastAttackTime: number;
  attackCooldown: number;
  isAlive: boolean;
  spawnTime: number;
  // Animation state
  isAttacking: boolean;
  attackAnimationStart: number;
  attackAnimationDuration: number;
  originalArmPositions: { left: THREE.Vector3; right: THREE.Vector3 };
  hasDealtDamage: boolean; // Track if damage was dealt in current attack
  // Movement state
  movementNoise: { x: number; z: number }; // Random movement variation
  limping: boolean; // Whether zombie is limping
  limpCycle: number; // Limping animation cycle
}

const zombies: Zombie[] = [];
const MAX_ZOMBIES = 50; // Limit max zombies to prevent memory issues
let zombieSpawnTimer = 0;
let zombieSpawnInterval = 5000; // Start with 5 seconds
let zombieSpawnCount = 1; // Zombies per spawn
let gameStartTime = 0;
let survivedTime = 0;
let zombiesKilled = 0;
let weaponDamageMultiplier = 1.0;
const DAMAGE_UPGRADE_MULTIPLIER = 1.05;
let currentHealth = MAX_HEALTH;
let lastDamageTime = 0;
let lastMovementTime = 0;
let isRegeneratingHealth = false;
let isMoving = false;

// Health system constants
const MOVEMENT_HEALTH_DRAIN_RATE = 5; // HP per second lost while moving when injured
const HEALTH_REGEN_DELAY = 5000; // 5 seconds delay before regeneration starts
const HEALTH_REGEN_RATE = 10; // HP per second regeneration rate

// Movement speed based on health constants
const MIN_MOVEMENT_SPEED_MULTIPLIER = 0.2; // Minimum 20% movement speed when critically injured
const MAX_MOVEMENT_SPEED_MULTIPLIER = 1.0; // Maximum 100% movement speed when healthy
const AIMING_SPEED_MULTIPLIER = 0.6; // Movement speed reduction when aiming (60% of normal speed)
const SPEED_REDUCTION_SEVERITY_THRESHOLD = 60; // Speed percentage threshold for red color warning
const SPEED_REDUCTION_WARNING_THRESHOLD = 80; // Speed percentage threshold for yellow color warning



const PLAYER_HEIGHT = 1.8;
const PLAYER_RADIUS = 0.4;
const MOVEMENT_SPEED = 5.0 * 1.5; // Increased movement speed
const PROJECTILE_LIFETIME = 5.0; 
const PROJECTILE_RADIUS = 0.08;
const GRAVITY = 9.8; // Gravity acceleration (m/s²)
const JUMP_VELOCITY = 7.0; // Initial jump velocity (m/s)
const MAX_CLIMBABLE_ANGLE = 45; // Maximum climbable slope angle in degrees
const STEP_UP_HEIGHT = 0.5; // Maximum height player can automatically step up

// Ballistic calculation functions
function calculateVelocityAtDistance(initialVelocity: number, distance: number, ballisticCoefficient: number, airDensity: number = 1.225): number {
  // Increased drag constant for more noticeable air resistance effect
  const dragConstant = 0.000001 * airDensity / ballisticCoefficient;
  return initialVelocity * Math.exp(-dragConstant * distance);
}

function calculateVelocityBasedDamage(baseDamage: number, currentVelocity: number, initialVelocity: number): number {
  // Calculate velocity-based damage multiplier
  const velocityRatio = currentVelocity / initialVelocity;
  
  // Apply velocity-based damage scaling
  return baseDamage * velocityRatio;
} 

const projectileGeometry = new THREE.SphereGeometry(PROJECTILE_RADIUS, 8, 8);
const handgunProjectileMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sniperProjectileMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const smgProjectileMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 }); // Orange for SMG
const remoteProjectileMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red for remote projectiles

// Weapon Models & Muzzle Points
let handgunModel: THREE.Group;
let handgunMuzzlePoint: THREE.Object3D;
let sniperRifleModel: THREE.Group;
let sniperMuzzlePoint: THREE.Object3D;
let smgModel: THREE.Group;
let smgMuzzlePoint: THREE.Object3D;

const raycaster = new THREE.Raycaster(); // Still used for ground detection, potentially other things


// Weapon Stats Structure
interface WeaponStats {
    hipPosition: THREE.Vector3;
    adsPosition: THREE.Vector3;
    hipRotation: THREE.Euler;
    adsRotation: THREE.Euler;
    adsFov: number;
    recoilAmount: THREE.Vector3; // x: max random sideways positional kick, y: (sniper ADS: camera pitch radians) OR (other: model vertical positional kick), z: model backward positional kick
    recoilDuration: number;
    recoilReturnSpeed: number;
    fireRate: number; // milliseconds
    projectileSpeed: number;
    projectileMaterial: THREE.Material;
    model: THREE.Group;
    muzzlePoint: THREE.Object3D;
    damage: number; // Damage dealt per hit
    spreadAngle?: number; // Max angle (radians) of deviation from center for hip fire
    adsSpreadMultiplier?: number; // Factor to reduce spreadAngle when ADS (e.g., 0.3 for 30%)
    magazineCapacity: number; // Maximum bullets in magazine
    reloadTime: number; // Time in milliseconds to reload
    zeroingDistance?: number; // Zeroing distance in meters (for sniper rifles)
    ballisticCoefficient?: number; // Ballistic coefficient (G1 standard)
    airDensity?: number; // Air density (kg/m³, default 1.225)
}

let weaponStatsDB: Record<string, Partial<WeaponStats>> = {}; // Will be populated after models are created

const NORMAL_FOV = 75;
const ADS_TRANSITION_SPEED = 10.0;

// Scope zoom levels
const SCOPE_ZOOM_LEVELS = [2, 4, 8, 16]; // 2x, 4x, 8x, 16x magnification
const SCOPE_BASE_FOV = 40; // Base FOV for 2x zoom
let currentScopeZoomIndex = 0; // Index in SCOPE_ZOOM_LEVELS array

// Calculate current scope FOV based on zoom level
function getCurrentScopeFOV(): number {
    const zoomLevel = SCOPE_ZOOM_LEVELS[currentScopeZoomIndex];
    return SCOPE_BASE_FOV / zoomLevel;
}

// Cycle to next zoom level
function cycleScopeZoom(): void {
    currentScopeZoomIndex = (currentScopeZoomIndex + 1) % SCOPE_ZOOM_LEVELS.length;
    updateZoomDisplay();
}

// Update zoom level display
function updateZoomDisplay(): void {
    const zoomDisplay = document.getElementById('zoom-display');
    if (zoomDisplay) {
        const currentZoom = SCOPE_ZOOM_LEVELS[currentScopeZoomIndex];
        zoomDisplay.textContent = `${currentZoom}x`;
        zoomDisplay.setAttribute('data-zoom', `${currentZoom}x`);
    }
}

// Update speed indicator for bike
function updateSpeedIndicator(): void {
    if (!speedIndicator) return;
    
    if (isOnBike) {
        // Convert bike speed to km/h (assuming game units are roughly meters/second)
        const speedKmh = Math.abs(bikeSpeed * 3.6); // Convert m/s to km/h
        const speedValue = document.getElementById('speed-value');
        if (speedValue) {
            speedValue.textContent = Math.round(speedKmh).toString();
        }
        speedIndicator.style.display = 'block';
    } else {
        speedIndicator.style.display = 'none';
    }
}

// Update bike durability indicator
function updateBikeDurabilityIndicator(): void {
    const bikeDurabilityIndicator = document.getElementById('bike-durability-indicator');
    if (!bikeDurabilityIndicator) return;
    
    if (isOnBike) {
        const durabilityValue = document.getElementById('bike-durability-value');
        if (durabilityValue) {
            durabilityValue.textContent = Math.round(bikeHealth).toString();
        }
        
        // Change color based on damage level
        const healthPercentage = bikeHealth / bikeMaxHealth;
        if (healthPercentage > 0.6) {
            bikeDurabilityIndicator.style.color = '#00ff00'; // Green
        } else if (healthPercentage > 0.3) {
            bikeDurabilityIndicator.style.color = '#ffff00'; // Yellow
        } else {
            bikeDurabilityIndicator.style.color = '#ff0000'; // Red
        }
        
        bikeDurabilityIndicator.style.display = 'block';
    } else {
        bikeDurabilityIndicator.style.display = 'none';
    }
}

// Get mouse sensitivity multiplier based on current zoom level
function getMouseSensitivityMultiplier(): number {
    if (currentEquippedWeapon === 'sniper' && (isAimingWithMouseActual || isAimingWithKeyActual)) {
        const zoomLevel = SCOPE_ZOOM_LEVELS[currentScopeZoomIndex];
        // Reduce sensitivity more for higher zoom levels
        // 2x: 0.5, 4x: 0.25, 8x: 0.125, 16x: 0.0625
        return 1 / zoomLevel;
    }
    return 1.0; // Normal sensitivity for non-scoped or other weapons
}

let currentEquippedWeapon: 'handgun' | 'sniper' | 'smg' = 'handgun';
let lastFireTime = 0;
let currentAmmo: Record<string, number> = {}; // Current ammo for each weapon
let sniperZeroingDistance = 100; // Current zeroing distance for sniper rifle (meters)
let isReloading = false;
let reloadStartTime = 0;
let weaponReloadOffset = new THREE.Vector3(); // Reload animation offset
let weaponReloadTime = 0; // Time elapsed in reload animation

let activeWeaponRecoilOffset = new THREE.Vector3(); // Current positional recoil of weapon model
let cameraPitchRecoil = 0; // Current camera pitch recoil value (radians)
let isWeaponRecoiling = false;
let weaponRecoilTime = 0;


let gameMode: 'idle' | 'singleplayer' | 'multiplayer' = 'idle';
let isGameInitialized = false;

// UI Elements
const mainMenuDiv = document.getElementById('main-menu') as HTMLDivElement;
const instructionOverlay = document.getElementById('instruction-overlay') as HTMLDivElement;
const gameContainer = document.getElementById('game-container') as HTMLDivElement;
const startSinglePlayerButton = document.getElementById('start-singleplayer') as HTMLButtonElement;
const startMultiplayerButton = document.getElementById('start-multiplayer') as HTMLButtonElement;
const instructionText = document.getElementById('instruction-text') as HTMLDivElement;
const p2pInstructionText = document.getElementById('p2p-instruction') as HTMLParagraphElement;
const playerCountDisplay = document.getElementById('player-count-display') as HTMLDivElement;
const playerCountSpan = document.getElementById('player-count') as HTMLSpanElement;
const startGameRequestBtn = document.getElementById('start-game-request-btn') as HTMLButtonElement;
const scopeOverlay = document.getElementById('scope-overlay') as HTMLDivElement;
const speedIndicator = document.getElementById('speed-indicator') as HTMLDivElement;


// P2P Signaling UI Elements
const signalingPanel = document.getElementById('webrtc-signaling-panel') as HTMLDivElement;
const p2pStatusText = document.getElementById('p2p-status') as HTMLParagraphElement;
const createOfferBtn = document.getElementById('create-offer-btn') as HTMLButtonElement;
const createAnswerBtn = document.getElementById('create-answer-btn') as HTMLButtonElement;
const localSdpTextarea = document.getElementById('local-sdp') as HTMLTextAreaElement;
const remoteSdpTextarea = document.getElementById('remote-sdp') as HTMLTextAreaElement;
const setRemoteSdpBtn = document.getElementById('set-remote-sdp-btn') as HTMLButtonElement;
const localIceTextarea = document.getElementById('local-ice') as HTMLTextAreaElement;
const remoteIceTextarea = document.getElementById('remote-ice') as HTMLTextAreaElement;
const addRemoteIceBtn = document.getElementById('add-remote-ice-btn') as HTMLButtonElement;
const closeSignalingBtn = document.getElementById('close-signaling-btn') as HTMLButtonElement;
const copyLocalSdpBtn = document.getElementById('copy-local-sdp-btn') as HTMLButtonElement;
const copyLocalIceBtn = document.getElementById('copy-local-ice-btn') as HTMLButtonElement;


// WebRTC Variables - Updated for multiplayer support
const peerConnections = new Map<string, RTCPeerConnection>();
const dataChannels = new Map<string, RTCDataChannel>();
let localPlayerId: string | null = null;

// Legacy variables for backward compatibility during transition
let peerConnection: RTCPeerConnection | null = null;
let dataChannel: RTCDataChannel | null = null;

// WebSocket Signaling Variables
let signalingSocket: WebSocket | null = null;
let clientId: string | null = null;
let currentRoom: string | null = null;
let isWaitingForOpponent = false;
let matchmakingTimeout: number | null = null;

const FALLBACK_STUN_SERVERS: RTCIceServer[] = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
];

async function getIceServersConfiguration(): Promise<RTCConfiguration> {
    const apiKey = "d51424dc9b80232dbc239f680b412cdbfe33"; // As provided by the user
    try {
        const response = await fetch(`https://p2p-sample.metered.live/api/v1/turn/credentials?apiKey=${apiKey}`);
        if (!response.ok) {
            console.warn(`Failed to fetch TURN credentials: ${response.status} ${response.statusText}. Using fallback STUN servers.`);
            return { iceServers: FALLBACK_STUN_SERVERS };
        }
        const fetchedIceServers = await response.json(); // Expected to be an array of RTCICEServer objects

        if (Array.isArray(fetchedIceServers) && fetchedIceServers.length > 0) {
            console.log("Successfully fetched TURN credentials. Combining with fallback STUN.");
            // Combine fetched TURN servers with fallback STUN servers.
            return { iceServers: [...fetchedIceServers, ...FALLBACK_STUN_SERVERS] };
        } else {
            console.warn("Fetched TURN credentials but the list is empty or invalid. Using fallback STUN servers only.");
            return { iceServers: FALLBACK_STUN_SERVERS };
        }
    } catch (error) {
        console.error("Error fetching TURN credentials, using fallback STUN servers:", error);
        return { iceServers: FALLBACK_STUN_SERVERS };
    }
}


// Remote player management for multiplayer
interface RemotePlayerMeshes {
    mainMesh: THREE.Group;
    handgunMesh: THREE.Mesh;
    sniperMesh: THREE.Mesh;
    smgMesh: THREE.Mesh;
    bikeModel?: THREE.Group;
}

const remotePlayerMeshes = new Map<string, RemotePlayerMeshes>();

// Legacy variables for backward compatibility
let remotePlayerMesh: THREE.Group | null = null;
let remotePlayerHandgunMesh: THREE.Mesh | null = null;
let remotePlayerSniperMesh: THREE.Mesh | null = null;
let remotePlayerSMGMesh: THREE.Mesh | null = null;
let remotePlayerBikeModel: THREE.Group | null = null;


// Constants for humanoid remote player model parts
const REMOTE_PLAYER_HEAD_RADIUS = 0.25;
const REMOTE_PLAYER_TORSO_SIZE = new THREE.Vector3(0.5, 0.8, 0.3);
const REMOTE_PLAYER_LEGS_HEIGHT = PLAYER_HEIGHT - (REMOTE_PLAYER_HEAD_RADIUS * 2) - REMOTE_PLAYER_TORSO_SIZE.y;
const REMOTE_PLAYER_LEGS_SIZE = new THREE.Vector3(0.4, REMOTE_PLAYER_LEGS_HEIGHT, 0.25);


const REMOTE_HANDGUN_HIP_OFFSET = new THREE.Vector3(
    REMOTE_PLAYER_TORSO_SIZE.x / 2 + 0.05,
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.3,
    REMOTE_PLAYER_TORSO_SIZE.z / 2 - 0.05
);
const REMOTE_HANDGUN_ADS_OFFSET = new THREE.Vector3(
    0, 
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.8, 
    REMOTE_PLAYER_TORSO_SIZE.z / 2 + 0.2 
);

const REMOTE_SNIPER_HIP_OFFSET = new THREE.Vector3(
    REMOTE_PLAYER_TORSO_SIZE.x / 2 + 0.08, 
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.35, 
    REMOTE_PLAYER_TORSO_SIZE.z / 2 - 0.03
);
const REMOTE_SNIPER_ADS_OFFSET = new THREE.Vector3(
    0,
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.75, 
    REMOTE_PLAYER_TORSO_SIZE.z / 2 + 0.35 
);

const REMOTE_SMG_HIP_OFFSET = new THREE.Vector3(
    REMOTE_PLAYER_TORSO_SIZE.x / 2 + 0.04,
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.32,
    REMOTE_PLAYER_TORSO_SIZE.z / 2 - 0.02
);
const REMOTE_SMG_ADS_OFFSET = new THREE.Vector3(
    0,
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.77,
    REMOTE_PLAYER_TORSO_SIZE.z / 2 + 0.25
);


let lastSentStateTime = 0;
const STATE_SEND_INTERVAL = INPUT_DELAY_MS;
let isPlayerOne: boolean | null = null;

// Player management for multiplayer
const connectedPlayers = new Map<string, { playerId: string; isConnected: boolean }>();

// Helper functions for multiplayer player management
function getConnectedPlayerIds(): string[] {
    return Array.from(connectedPlayers.keys()).filter(id => connectedPlayers.get(id)?.isConnected);
}

function getDataChannelForPlayer(playerId: string): RTCDataChannel | null {
    return dataChannels.get(playerId) || null;
}

// Backward compatibility: get primary opponent for 2-player mode
function getPrimaryOpponentId(): string | null {
    const connectedIds = getConnectedPlayerIds();
    return connectedIds.length > 0 ? connectedIds[0] : null;
}

// Backward compatibility: maintain legacy variables
function updateLegacyVariables() {
    const primaryOpponent = getPrimaryOpponentId();
    
    // Only update if we have a primary opponent, otherwise preserve existing connections
    if (primaryOpponent) {
        peerConnection = peerConnections.get(primaryOpponent) || peerConnection;
        dataChannel = dataChannels.get(primaryOpponent) || dataChannel;
    }
    // Don't set to null if no primary opponent - this preserves active connections during setup
}

// Start game from a multiplayer request
function startGameFromRequest() {
    if (gameMode !== 'multiplayer') return;
    
    // Clean up any legacy players before starting
    if (connectedPlayers.has('opponent')) {
        connectedPlayers.delete('opponent');
        removeRemotePlayerMeshes('opponent');
    }
    
    // Hide multiplayer UI elements
    if (signalingPanel) signalingPanel.style.display = 'none';
    if (playerCountDisplay) playerCountDisplay.style.display = 'none';
    if (startGameRequestBtn) startGameRequestBtn.style.display = 'none';
    
    // Start the actual game
    if (!mainMenuDiv || !instructionOverlay || !gameContainer || !instructionText) return;
    mainMenuDiv.style.display = 'none';
    gameContainer.style.display = 'block';
    isGameOver = false;

    instructionText.textContent = "Multiplayer Game Starting...";
    if (p2pInstructionText) p2pInstructionText.style.display = 'none';
    instructionOverlay.style.display = 'flex';

    if (!isGameInitialized) {
        initThreeJSGame();
    }
    
    // For multiplayer, map seed and type will be set via P2P
    // Note: We don't call resetGameScene here, as that will be triggered by map seed exchange
}

// Update UI to show connected player count
function updatePlayerCountDisplay() {
    const connectedCount = getConnectedPlayerIds().length;
    
    if (playerCountSpan) {
        playerCountSpan.textContent = connectedCount.toString();
    } else {
        console.warn('[UI Update] playerCountSpan element not found');
    }
    
    // Show/hide the display based on multiplayer mode and connections
    if (playerCountDisplay && gameMode === 'multiplayer') {
        playerCountDisplay.style.display = connectedCount > 0 ? 'block' : 'none';
        
        // Show start game button if there are connected players
        if (startGameRequestBtn) {
            startGameRequestBtn.style.display = connectedCount > 0 ? 'block' : 'none';
        } else {
            console.warn('[UI Update] startGameRequestBtn element not found');
        }
        
        // Update instruction text
        if (p2pInstructionText) {
            if (connectedCount > 0) {
                p2pInstructionText.textContent = `${connectedCount} player(s) connected. Click "Start Game" to begin!`;
            } else {
                p2pInstructionText.textContent = "Use P2P controls below to connect, then click to start.";
            }
        } else {
            console.warn('[UI Update] p2pInstructionText element not found');
        }
    } else {
        // Hide multiplayer UI in single player mode
        if (playerCountDisplay) playerCountDisplay.style.display = 'none';
        if (startGameRequestBtn) startGameRequestBtn.style.display = 'none';
    }
    
    // Force UI refresh and provide manual start option
    if (connectedCount >= 2) {
    }
}

// Get map scale based on map type
function getMapScale(): number {
    switch (currentMapType) {
        case MapType.ARENA:
            return 160;
        case MapType.URBAN:
            return 190;
        case MapType.FOREST:
            return 170;
        case MapType.PLAINS:
            return 900; // Large plains map
        case MapType.MOUNTAIN:
            return 200;
        default:
            return 160;
    }
}

// Generate random spawn position within map bounds
function generateRandomSpawnPosition(): THREE.Vector3 {
    if (!spawnPrng) {
        console.warn("generateRandomSpawnPosition called before spawn PRNG initialized");
        return new THREE.Vector3(0, PLAYER_HEIGHT, 0);
    }
    
    const scale = getMapScale();
    const maxRange = scale * 0.8; // Use 80% of map scale as spawnable area
    
    // Create a unique PRNG for this specific spawn calculation using current time + client ID
    const uniqueSeed = (currentMapSeed || Date.now()) + 
                      (clientId ? clientId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) : 0) + 
                      performance.now();
    const uniqueSpawnPrng = new PRNG(uniqueSeed);
    
    const x = uniqueSpawnPrng.randFloat(-maxRange, maxRange);
    const z = uniqueSpawnPrng.randFloat(-maxRange, maxRange);
    
    return new THREE.Vector3(x, PLAYER_HEIGHT, z);
}

// Using fallback zombie models only - file loading removed

function createFallbackZombieModel(scale: number = 1.0, colorVariation: number = 0): { group: THREE.Group; leftArm: THREE.Mesh; rightArm: THREE.Mesh } {
  // Fallback to improved box geometry with randomization
  const zombieGroup = new THREE.Group();
  
  // Apply scale to zombie
  zombieGroup.scale.set(scale, scale, scale);
  
  // Color variations for personality
  const baseColors = {
    body: 0x4a5d23,
    head: 0x6b7c32,
    arms: 0x5a6b28,
    legs: 0x3d4a1f
  };
  
  // Apply color variation (-0.3 to +0.3)
  const variation = (colorVariation - 0.5) * 0.6;
  const adjustColor = (color: number) => {
    const r = Math.max(0, Math.min(1, ((color >> 16) & 0xff) / 255 + variation));
    const g = Math.max(0, Math.min(1, ((color >> 8) & 0xff) / 255 + variation));
    const b = Math.max(0, Math.min(1, (color & 0xff) / 255 + variation));
    return (Math.floor(r * 255) << 16) | (Math.floor(g * 255) << 8) | Math.floor(b * 255);
  };
  
  // All positions compensated for scaling - legs touch ground properly
  const legY = 0.3 / scale - 2.5 + scale; // Half leg height above ground (0.6 leg height / 2)
  const bodyY = (0.6 + 0.6) / scale - 2.5 + scale; // leg height + half body height
  const headY = (0.6 + 1.2 + 0.2) / scale - 2.5 + scale; // leg height + body height + half head height
  const armY = (0.6 + 0.6) / scale - 2.5 + scale; // leg height + half body height (arm center)

  // Body - positioned above legs
  const bodyGeometry = new THREE.BoxGeometry(0.6, 1.2, 0.4);
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: adjustColor(baseColors.body) });
  const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
  bodyMesh.position.y = bodyY;
  zombieGroup.add(bodyMesh);
  
  // Head - positioned above body
  const headGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const headMaterial = new THREE.MeshLambertMaterial({ color: adjustColor(baseColors.head) });
  const headMesh = new THREE.Mesh(headGeometry, headMaterial);
  headMesh.position.y = headY;
  zombieGroup.add(headMesh);
  
  // Arms - positioned at body center height
  const armGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.2);
  const armMaterial = new THREE.MeshLambertMaterial({ color: adjustColor(baseColors.arms) });
  
  const leftArm = new THREE.Mesh(armGeometry, armMaterial);
  leftArm.position.set(-0.5, armY, 0);
  zombieGroup.add(leftArm);
  
  const rightArm = new THREE.Mesh(armGeometry, armMaterial);
  rightArm.position.set(0.5, armY, 0);
  zombieGroup.add(rightArm);
  
  // Legs - positioned to touch ground (using already calculated legY)
  const legGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
  const legMaterial = new THREE.MeshLambertMaterial({ color: adjustColor(baseColors.legs) });
  
  const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
  leftLeg.position.set(-0.2, legY, 0);
  zombieGroup.add(leftLeg);
  
  const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
  rightLeg.position.set(0.2, legY, 0);
  zombieGroup.add(rightLeg);
  
  return { group: zombieGroup, leftArm, rightArm };
}

// Load zombie model with randomization and time-based scaling
function loadZombieModel(): Promise<{ group: THREE.Group; leftArm: THREE.Mesh; rightArm: THREE.Mesh }> {
  return new Promise((resolve) => {
    // Calculate time-based scaling (stronger zombies over time)
    const timeSurvived = gameStartTime ? (performance.now() - gameStartTime) / 1000 : 0;
    const timeScaling = 1.0 + Math.min(timeSurvived / 60, 1.0); // Up to 2x size after 1 minute
    
    // Random individual scaling (0.8x to 1.2x base size)
    const randomScale = 0.8 + Math.random() * 0.4;
    const finalScale = timeScaling * randomScale;
    
    // Random color variation (0 to 1)
    const colorVariation = Math.random();
    
    console.log(`Creating zombie: TimeSurvived=${timeSurvived.toFixed(1)}s, TimeScaling=${timeScaling.toFixed(2)}x, FinalScale=${finalScale.toFixed(2)}`);
    resolve(createFallbackZombieModel(finalScale, colorVariation));
  });
}

// Zombie management functions
async function createZombie(position: THREE.Vector3): Promise<Zombie> {
  const zombieData = await loadZombieModel();
  zombieData.group.position.copy(position);
  scene.add(zombieData.group);
  
  // Calculate time-based stat scaling
  const timeSurvived = gameStartTime ? (performance.now() - gameStartTime) / 1000 : 0;
  const timeMultiplier = 1.0 + Math.min(timeSurvived / 60, 9.0); // Up to 10x stats after 60 seconds
  
  console.log(`Zombie Stats: TimeSurvived=${timeSurvived.toFixed(1)}s, TimeMultiplier=${timeMultiplier.toFixed(2)}x`);
  
  // Base stats with random variation (±20%)
  const baseHealth = 50;
  const baseSpeed = 2.0;
  const baseAttackDamage = 15;
  const baseAttackRange = 2.0;
  const baseCooldown = 1500;
  
  // Apply randomization (0.8x to 1.2x)
  const randomVariation = () => 0.8 + Math.random() * 0.4;
  
  const maxHealth = Math.floor(baseHealth * timeMultiplier * randomVariation());
  const speed = baseSpeed * timeMultiplier * randomVariation();
  const attackDamage = Math.floor(baseAttackDamage * timeMultiplier * randomVariation());
  const attackRange = baseAttackRange * randomVariation();
  const attackCooldown = Math.max(500, baseCooldown / (timeMultiplier * randomVariation())); // Faster attacks over time
  
  const zombie: Zombie = {
    id: Math.random().toString(36).substring(2, 9),
    mesh: zombieData.group as any, // Group can be treated as Mesh for our purposes
    position: position.clone(),
    velocity: new THREE.Vector3(),
    health: maxHealth,
    maxHealth: maxHealth,
    speed: speed,
    attackRange: attackRange,
    attackDamage: attackDamage,
    lastAttackTime: 0,
    attackCooldown: attackCooldown,
    isAlive: true,
    spawnTime: performance.now(),
    // Animation state
    isAttacking: false,
    attackAnimationStart: 0,
    attackAnimationDuration: 800, // 800ms attack animation for dramatic effect
    originalArmPositions: {
      left: zombieData.leftArm.position.clone(),
      right: zombieData.rightArm.position.clone()
    },
    hasDealtDamage: false,
    // Movement state
    movementNoise: { x: Math.random() * 0.5 - 0.25, z: Math.random() * 0.5 - 0.25 },
    limping: Math.random() < 0.7, // 70% chance of limping
    limpCycle: Math.random() * Math.PI * 2
  };
  
  // Store arm references for animation
  (zombie.mesh as any).leftArm = zombieData.leftArm;
  (zombie.mesh as any).rightArm = zombieData.rightArm;
  
  console.log(`Spawned zombie: HP=${maxHealth}, Speed=${speed.toFixed(1)}, Damage=${attackDamage}, Range=${attackRange.toFixed(1)}, Cooldown=${attackCooldown}ms, Scale=${zombieData.group.scale.x.toFixed(2)}x`);
  
  return zombie;
}

// Attack animation functions
function startZombieAttackAnimation(zombie: Zombie): void {
  if (zombie.isAttacking) return;
  
  zombie.isAttacking = true;
  zombie.attackAnimationStart = performance.now();
  zombie.hasDealtDamage = false; // Reset damage flag
  
  console.log(`Zombie ${zombie.id} started attack animation`);
}

function updateZombieAttackAnimation(zombie: Zombie): boolean {
  if (!zombie.isAttacking) return false;
  
  const elapsed = performance.now() - zombie.attackAnimationStart;
  const progress = Math.min(elapsed / zombie.attackAnimationDuration, 1.0);
  
  // Check if we should deal damage (during strike phase and haven't dealt damage yet)
  let shouldDealDamage = false;
  if (progress >= 0.4 && progress <= 0.6 && !zombie.hasDealtDamage) {
    shouldDealDamage = true;
    zombie.hasDealtDamage = true;
  }
  
  // Get arm references
  const leftArm = (zombie.mesh as any).leftArm;
  const rightArm = (zombie.mesh as any).rightArm;
  
  if (leftArm && rightArm) {
    // Dynamic swinging motion - dramatic arc
    // Phase 1 (0-0.3): Wind up - arms go back and up
    // Phase 2 (0.3-0.7): Strike - arms swing forward dramatically
    // Phase 3 (0.7-1.0): Follow through and return
    
    let swingX, swingY, swingZ;
    
    if (progress < 0.3) {
      // Wind up phase
      const windupProgress = progress / 0.3;
      swingX = -windupProgress * 0.3; // Pull back
      swingY = windupProgress * 0.4; // Lift up
      swingZ = -windupProgress * 0.2; // Slight back
    } else if (progress < 0.7) {
      // Strike phase - dramatic forward swing
      const strikeProgress = (progress - 0.3) / 0.4;
      swingX = -0.3 + strikeProgress * 1.0; // Swing forward dramatically
      swingY = 0.4 - strikeProgress * 0.6; // Swing down
      swingZ = -0.2 + strikeProgress * 0.8; // Forward motion
    } else {
      // Follow through and return
      const returnProgress = (progress - 0.7) / 0.3;
      swingX = 0.7 - returnProgress * 0.7; // Return to center
      swingY = -0.2 + returnProgress * 0.2; // Return to normal height
      swingZ = 0.6 - returnProgress * 0.6; // Return to normal depth
    }
    
    // Apply different motion to each arm for more dynamic effect
    leftArm.position.x = zombie.originalArmPositions.left.x + swingX;
    leftArm.position.y = zombie.originalArmPositions.left.y + swingY;
    leftArm.position.z = zombie.originalArmPositions.left.z + swingZ;
    
    // Right arm with slight offset for asymmetry
    rightArm.position.x = zombie.originalArmPositions.right.x + swingX * 0.8;
    rightArm.position.y = zombie.originalArmPositions.right.y + swingY * 1.1;
    rightArm.position.z = zombie.originalArmPositions.right.z + swingZ * 0.9;
    
    // Add rotation for more dramatic effect
    if (leftArm.rotation && rightArm.rotation) {
      const rotationAmount = Math.sin(progress * Math.PI) * 0.5;
      leftArm.rotation.x = rotationAmount;
      rightArm.rotation.x = rotationAmount;
    }
  }
  
  // End animation when complete
  if (progress >= 1.0) {
    zombie.isAttacking = false;
    zombie.hasDealtDamage = false; // Reset for next attack
    
    // Reset arm positions and rotations
    if (leftArm && rightArm) {
      leftArm.position.copy(zombie.originalArmPositions.left);
      rightArm.position.copy(zombie.originalArmPositions.right);
      if (leftArm.rotation && rightArm.rotation) {
        leftArm.rotation.x = 0;
        rightArm.rotation.x = 0;
      }
    }
  }
  
  return shouldDealDamage;
}

async function spawnZombie(): Promise<void> {
  if (gameMode !== 'singleplayer') return;
  
  // Don't spawn if max zombies reached
  if (zombies.length >= MAX_ZOMBIES) {
    console.log('Max zombie limit reached, skipping spawn');
    return;
  }
  
  const spawnPosition = generateRandomSpawnPosition();
  spawnPosition.y = PLAYER_HEIGHT;
  
  const playerPos = controls.getObject().position;
  const distance = spawnPosition.distanceTo(playerPos);
  
  if (distance < 15) {
    const direction = new THREE.Vector3()
      .subVectors(spawnPosition, playerPos)
      .normalize()
      .multiplyScalar(20);
    spawnPosition.add(direction);
  }
  
  try {
    const zombie = await createZombie(spawnPosition);
    zombies.push(zombie);
    console.log(`Spawned zombie. Total: ${zombies.length}/${MAX_ZOMBIES}`);
  } catch (error) {
    console.error('Failed to spawn zombie:', error);
  }
}

function updateZombies(delta: number): void {
  if (gameMode !== 'singleplayer') return;
  
  const playerPos = controls.getObject().position;
  const currentTime = performance.now();
  
  for (let i = zombies.length - 1; i >= 0; i--) {
    const zombie = zombies[i];
    
    if (!zombie.isAlive) {
      scene.remove(zombie.mesh);
      // Dispose geometry and materials for Groups
      zombie.mesh.traverse((child: any) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: any) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      zombies.splice(i, 1);
      continue;
    }
    
    const distanceToPlayer = zombie.position.distanceTo(playerPos);
    
    // Update attack animation and check if damage should be dealt
    const shouldDealDamage = updateZombieAttackAnimation(zombie);
    
    if (distanceToPlayer <= zombie.attackRange) {
      // Start attack if not already attacking and cooldown is ready
      if (!zombie.isAttacking && currentTime - zombie.lastAttackTime >= zombie.attackCooldown) {
        startZombieAttackAnimation(zombie);
        zombie.lastAttackTime = currentTime;
      }
      
      // Deal damage during strike phase of animation
      if (shouldDealDamage) {
        currentHealth -= zombie.attackDamage;
        showTemporaryMessage(`Zombie attacked! Health: ${currentHealth}`, 1000);
        
        if (currentHealth <= 0) {
          handlePlayerDeath();
        }
      }
    } else {
      // Calculate direction to player
      const direction = new THREE.Vector3()
        .subVectors(playerPos, zombie.position)
        .normalize();
      
      // Make zombie face player direction (Y-axis rotation only to prevent flipping)
      const angle = Math.atan2(direction.x, direction.z);
      zombie.mesh.rotation.y = angle;
      
      // Add unstable movement with foot dragging
      zombie.limpCycle += delta * (zombie.limping ? 3.0 : 4.0); // Slower if limping
      
      // Calculate movement speed with variations
      let moveSpeed = zombie.speed;
      
      if (zombie.limping) {
        // Limping creates irregular speed
        const limpEffect = Math.sin(zombie.limpCycle) * 0.4 + 0.6; // 0.2 to 1.0 multiplier
        moveSpeed *= limpEffect;
        
        // Add foot dragging effect - periodic slowdown
        if (Math.sin(zombie.limpCycle) < -0.5) {
          moveSpeed *= 0.3; // Significant slowdown during "drag" phase
        }
      }
      
      // Add random movement noise
      zombie.movementNoise.x += (Math.random() - 0.5) * 0.02;
      zombie.movementNoise.z += (Math.random() - 0.5) * 0.02;
      
      // Clamp noise to reasonable limits
      zombie.movementNoise.x = Math.max(-0.3, Math.min(0.3, zombie.movementNoise.x));
      zombie.movementNoise.z = Math.max(-0.3, Math.min(0.3, zombie.movementNoise.z));
      
      // Apply direction with noise
      const noisyDirection = direction.clone();
      noisyDirection.x += zombie.movementNoise.x;
      noisyDirection.z += zombie.movementNoise.z;
      noisyDirection.normalize();
      
      zombie.velocity.copy(noisyDirection).multiplyScalar(moveSpeed);
      zombie.position.add(zombie.velocity.clone().multiplyScalar(delta));
      zombie.mesh.position.copy(zombie.position);
      
      // Add subtle body swaying for limping zombies (only Z-axis to avoid Y-axis conflicts)
      if (zombie.limping) {
        const swayAmount = Math.sin(zombie.limpCycle * 1.5) * 0.05;
        zombie.mesh.rotation.z = swayAmount;
        zombie.mesh.rotation.x = 0; // Ensure no X-axis rotation
      } else {
        // Reset rotations for non-limping zombies
        zombie.mesh.rotation.x = 0;
        zombie.mesh.rotation.z = 0;
      }
    }
  }
}

function damageZombie(zombieId: string, damage: number, isHeadshot: boolean = false): void {
  const zombie = zombies.find(z => z.id === zombieId);
  if (!zombie) return;
  
  zombie.health -= damage;
  
  // Show damage feedback with headshot indicator
  const hitMessage = isHeadshot 
    ? `HEADSHOT! -${damage} HP`
    : `HIT! -${damage} HP`;
    
  showTemporaryMessage(hitMessage, 300);
  
  if (zombie.health <= 0) {
    zombie.isAlive = false;
    zombiesKilled++;
    
    spawnPowerUp(zombie.position);
    
    const killMessage = isHeadshot 
      ? `Zombie headshot kill! Total: ${zombiesKilled}`
      : `Zombie killed! Total: ${zombiesKilled}`;
    showTemporaryMessage(killMessage, 500);
  }
}

function spawnPowerUp(position: THREE.Vector3): void {
  const powerUpGeometry = new THREE.SphereGeometry(0.3, 8, 8);
  const powerUpMaterial = new THREE.MeshLambertMaterial({ color: 0xff6b35 });
  const powerUpMesh = new THREE.Mesh(powerUpGeometry, powerUpMaterial);
  
  powerUpMesh.position.copy(position);
  powerUpMesh.position.y += 0.5;
  scene.add(powerUpMesh);
  
  const checkCollection = () => {
    const playerPos = controls.getObject().position;
    const distance = powerUpMesh.position.distanceTo(playerPos);
    
    if (distance < 2.0) {
      weaponDamageMultiplier *= DAMAGE_UPGRADE_MULTIPLIER;
      scene.remove(powerUpMesh);
      powerUpMesh.geometry.dispose();
      (powerUpMesh.material as THREE.Material).dispose();
      
      showTemporaryMessage(`Weapon upgraded! Damage x${weaponDamageMultiplier.toFixed(2)}`, 1000);
    } else {
      requestAnimationFrame(checkCollection);
    }
  };
  
  requestAnimationFrame(checkCollection);
}

function handlePlayerDeath(): void {
  myDeaths++;
  survivedTime = (performance.now() - gameStartTime) / 1000;
  
  const finalScore = Math.floor(zombiesKilled * 100 + survivedTime * 10);
  
  showGameOverScreen(finalScore);
  
  if (myDeaths >= DEATHS_TO_LOSE) {
    gameMode = 'idle';
    resetGameState();
  } else {
    setTimeout(() => {
      currentHealth = MAX_HEALTH;
      triggerRespawn();
    }, 3000);
  }
}

function showGameOverScreen(score: number): void {
  const gameOverDiv = document.createElement('div');
  gameOverDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    font-family: Arial, sans-serif;
    z-index: 1000;
  `;
  
  gameOverDiv.innerHTML = `
    <h2>Game Over!</h2>
    <p>Survived: ${survivedTime.toFixed(1)} seconds</p>
    <p>Zombies Killed: ${zombiesKilled}</p>
    <p>Final Score: ${score}</p>
    <p>Deaths: ${myDeaths}/${DEATHS_TO_LOSE}</p>
    <button onclick="this.parentElement.remove()" style="
      background: #ff6b35;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    ">Close</button>
  `;
  
  document.body.appendChild(gameOverDiv);
}

function resetGameState(): void {
  zombies.forEach(zombie => {
    scene.remove(zombie.mesh);
    // Dispose geometry and materials for Groups
    zombie.mesh.traverse((child: any) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat: any) => mat.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  });
  zombies.length = 0;
  
  zombiesKilled = 0;
  weaponDamageMultiplier = 1.0;
  survivedTime = 0;
  gameStartTime = 0;
  zombieSpawnTimer = 0;
  zombieSpawnInterval = 5000;
  zombieSpawnCount = 1;
}

function getSpawnPointsForCurrentMap(): THREE.Vector3[] {
    // Generate multiple random spawn candidates for selection
    const spawnPoints: THREE.Vector3[] = [];
    const numCandidates = 20; // Generate 20 random candidates
    
    for (let i = 0; i < numCandidates; i++) {
        spawnPoints.push(generateRandomSpawnPosition());
    }
    
    return spawnPoints;
}

// Function to detect terrain height at given X,Z coordinates
function getTerrainHeightAt(x: number, z: number): number {
    if (currentMapType !== MapType.MOUNTAIN || terrainMeshes.length === 0) {
        return PLAYER_HEIGHT; // Default height for non-mountain maps
    }
    
    // Create a raycaster pointing downward from high above
    const raycaster = new THREE.Raycaster();
    const rayOrigin = new THREE.Vector3(x, 1000, z); // Start from high above
    const rayDirection = new THREE.Vector3(0, -1, 0); // Point downward
    
    raycaster.set(rayOrigin, rayDirection);
    
    // Collect all meshes from terrain for intersection testing
    const terrainMeshesToTest: THREE.Mesh[] = [];
    terrainMeshes.forEach(terrain => {
        terrain.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
                terrainMeshesToTest.push(child);
            }
        });
    });
    
    // Find intersections with terrain
    const intersections = raycaster.intersectObjects(terrainMeshesToTest);
    
    if (intersections.length > 0) {
        // Return the height of the highest intersection point + player height
        const highestPoint = intersections[0].point.y;
        const adjustedHeight = highestPoint + PLAYER_HEIGHT;
        return adjustedHeight;
    }
    
    // Fallback to default height if no intersection found
    return PLAYER_HEIGHT + 10; // Slightly elevated fallback
}

// Function to adjust spawn point to terrain height
function adjustSpawnPointToTerrain(spawnPoint: THREE.Vector3): THREE.Vector3 {
    if (currentMapType === MapType.MOUNTAIN) {
        const terrainHeight = getTerrainHeightAt(spawnPoint.x, spawnPoint.z);
        return new THREE.Vector3(spawnPoint.x, terrainHeight, spawnPoint.z);
    }
    return spawnPoint.clone();
}

// Bike collision detection and damage system
function checkBikeCollisions(): void {
    if (!isOnBike) return;
    
    const currentTime = Date.now();
    if (currentTime - bikeLastCollisionTime < bikeCollisionCooldown) return;
    
    // Create collision sphere around bike
    const bikeRadius = 2.0;
    const bikeBounds = new THREE.Sphere(bikePosition, bikeRadius);
    
    // Check collision with all scene objects
    const collidableObjects: THREE.Object3D[] = [];
    
    // Add map features as collision objects (buildings, obstacles, etc.)
    if (mapFeatures && mapFeatures.length > 0) {
        collidableObjects.push(...mapFeatures);
    }
    
    // Add terrain meshes for mountain maps
    if (currentMapType === MapType.MOUNTAIN && cachedTerrainMeshes.length > 0) {
        collidableObjects.push(...cachedTerrainMeshes);
    }
    
    // Add ground mesh
    if (groundMesh) {
        collidableObjects.push(groundMesh);
    }
    
    // Check collisions with each object (limit to prevent performance issues)
    let checkedObjects = 0;
    const maxObjectsToCheck = 20; // Limit collision checks per frame
    
    for (const obj of collidableObjects) {
        if (checkedObjects >= maxObjectsToCheck) break;
        if (obj.userData.isCollidable === false) continue;
        
        // Quick distance check first (cheaper than full bounds calculation)
        const objPosition = obj.position;
        const distance = bikePosition.distanceTo(objPosition);
        if (distance > bikeRadius + 5) { // Skip if clearly too far
            continue;
        }
        
        checkedObjects++;
        
        // Get object bounds only if distance check passes
        const objBounds = new THREE.Box3().setFromObject(obj);
        
        // Check if bike sphere intersects with object bounds
        if (bikeBounds.intersectsBox(objBounds)) {
            // Calculate damage based on speed
            const speedKmh = Math.abs(bikeSpeed) * 3.6; // Convert to km/h
            const damage = calculateBikeCrashDamage(speedKmh);
            
            if (damage > 0) {
                applyBikeDamage(damage, speedKmh);
                bikeLastCollisionTime = currentTime;
                
                // Reduce bike speed significantly after collision
                bikeSpeed *= 0.3;
                break; // Only process one collision per frame
            }
        }
    }
}

// Calculate crash damage based on speed
function calculateBikeCrashDamage(speedKmh: number): number {
    if (speedKmh < 10) return 0; // No damage at very low speeds
    if (speedKmh < 30) return 10; // Minor damage
    if (speedKmh < 60) return 25; // Moderate damage
    if (speedKmh < 100) return 50; // Major damage
    return 80; // Critical damage at high speeds
}

// Apply damage to bike and handle destruction
function applyBikeDamage(damage: number, speedKmh: number): void {
    bikeHealth -= damage;
    
    // Visual feedback for damage
    if (bikeModel) {
        const originalColor = bikeModel.userData.originalColor || 0x333333;
        bikeModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (!child.userData.originalColor) {
                    child.userData.originalColor = (child.material as THREE.MeshStandardMaterial).color.getHex();
                }
                (child.material as THREE.MeshStandardMaterial).color.setHex(0xff0000);
            }
        });
        
        // Restore color after brief flash
        setTimeout(() => {
            if (bikeModel) {
                bikeModel.traverse((child) => {
                    if (child instanceof THREE.Mesh && child.userData.originalColor) {
                        (child.material as THREE.MeshStandardMaterial).color.setHex(child.userData.originalColor);
                    }
                });
            }
        }, 200);
    }
    
    // Check if bike is destroyed
    if (bikeHealth <= 0) {
        explodeBike(speedKmh);
    }
}

// Create explosion effect and kill player
function explodeBike(speedKmh: number): void {
    // Create explosion effect
    createExplosionEffect(bikePosition);
    
    // Kill player with fatal damage
    takeDamage(currentHealth);
    
    // Handle death and respawn logic
    if (currentHealth <= 0) {
        // Health at zero, handle death
        
        // Handle multiplayer death event
        if (gameMode === 'multiplayer') {
            myDeaths++;
            sendGameEventToOtherPlayers({ 
                type: 'i_was_defeated',
                data: { defeatedPlayerId: clientId || 'unknown' } as GameEventDefeatedData
            });
            
            
            if (checkDefeatCondition()) {
                handleGameOver(false);
                return;
            }
        }
        
        // Reset health and trigger respawn
        currentHealth = MAX_HEALTH;
                triggerRespawn();
    }
    
    // Note: Bike model removal and state reset is handled in triggerRespawn()
    // to avoid duplicate processing and ensure consistent state management
}

// Create explosion visual effect
function createExplosionEffect(position: THREE.Vector3): void {
    // Create explosion sphere
    const explosionGeometry = new THREE.SphereGeometry(5, 16, 16);
    const explosionMaterial = new THREE.MeshStandardMaterial({
        color: 0xff4400,
        emissive: 0xff2200,
        transparent: true,
        opacity: 0.8
    });
    
    const explosionMesh = new THREE.Mesh(explosionGeometry, explosionMaterial);
    explosionMesh.position.copy(position);
    scene.add(explosionMesh);
    
    // Animate explosion
    let explosionScale = 0.1;
    let explosionOpacity = 0.8;
    const explosionInterval = setInterval(() => {
        explosionScale += 0.5;
        explosionOpacity -= 0.1;
        
        explosionMesh.scale.setScalar(explosionScale);
        explosionMaterial.opacity = Math.max(0, explosionOpacity);
        
        if (explosionOpacity <= 0) {
            clearInterval(explosionInterval);
            scene.remove(explosionMesh);
            explosionGeometry.dispose();
            explosionMaterial.dispose();
        }
    }, 50);
    
    // Create debris particles
    for (let i = 0; i < 10; i++) {
        const debrisGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const debrisMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333
        });
        
        const debris = new THREE.Mesh(debrisGeometry, debrisMaterial);
        debris.position.copy(position);
        debris.position.add(new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            Math.random() * 2,
            (Math.random() - 0.5) * 2
        ));
        
        scene.add(debris);
        
        // Animate debris
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            Math.random() * 10,
            (Math.random() - 0.5) * 10
        );
        
        let debrisLife = 2000; // 2 seconds
        const debrisInterval = setInterval(() => {
            debris.position.add(velocity.clone().multiplyScalar(0.05));
            velocity.y -= 0.2; // Gravity
            debrisLife -= 50;
            
            if (debrisLife <= 0) {
                clearInterval(debrisInterval);
                scene.remove(debris);
                debrisGeometry.dispose();
                debrisMaterial.dispose();
            }
        }, 50);
    }
}
const mapFeatures: THREE.Mesh[] = [];
const buildingMeshes: THREE.Object3D[] = []; // Store building meshes for collision detection
const terrainMeshes: THREE.Object3D[] = []; // Store terrain meshes separately from collision objects
let cachedTerrainMeshes: THREE.Mesh[] = []; // Cache terrain meshes for performance
const arenaMapFeatureMaterial = new THREE.MeshStandardMaterial({ color: 0x607D8B, roughness: 0.8, metalness: 0.2 });

// Get map bounds based on current map scale
function getMapBounds() {
    const scale = getMapScale();
    const boundRange = scale * 0.85; // Use 85% of map scale for object placement
    return { minX: -boundRange, maxX: boundRange, minZ: -boundRange, maxZ: boundRange };
}

// Get object count multiplier based on map scale
function getObjectCountMultiplier(): number {
    const scale = getMapScale();
    const baseScale = 160; // Arena scale as base
    return Math.max(1, scale / baseScale); // At least 1x, more for larger maps
}

// Create ground mesh based on current map type
function createGroundMesh() {
    // Remove existing ground if it exists
    if (groundMesh && scene) {
        scene.remove(groundMesh);
        if (groundMesh.geometry) groundMesh.geometry.dispose();
        if (groundMesh.material instanceof THREE.Material) groundMesh.material.dispose();
    }
    
    // Set ground size based on map type
    const groundSize = currentMapType === MapType.PLAINS ? 2000 : 500; // 2km x 2km for plains, 500x500 for others
    const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: ARENA_GROUND_COLOR, roughness: 0.9 }); 
    groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2; 
    groundMesh.receiveShadow = true; 
    groundMesh.name = "ground";
    
    if (scene) {
        scene.add(groundMesh);
    }
}
const urbanBuildingMaterial = new THREE.MeshStandardMaterial({ color: 0x78909C, roughness: 0.7, metalness: 0.1 }); 
const urbanObstacleMaterial = new THREE.MeshStandardMaterial({ color: 0x546E7A, roughness: 0.8, metalness: 0.1 }); 
const forestTreeTrunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9, metalness: 0.1 });
const forestFoliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.8, metalness: 0.0 });
const forestRockMaterial = new THREE.MeshStandardMaterial({ color: 0x696969, roughness: 0.9, metalness: 0.2 });
const plainsRockMaterial = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.8, metalness: 0.1 }); // Sandy brown
const plainsGrassMaterial = new THREE.MeshStandardMaterial({ color: 0x9ACD32, roughness: 0.9, metalness: 0.0 }); // Yellow green
const plainsTreeMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8, metalness: 0.1 }); // Saddle brown


let groundMesh: THREE.Mesh;
const ARENA_GROUND_COLOR = 0x283747;
const URBAN_GROUND_COLOR = 0x424242; 
const FOREST_GROUND_COLOR = 0x556B2F;
const PLAINS_GROUND_COLOR = 0x6B8E23; // Olive drab for grasslands
const MOUNTAIN_GROUND_COLOR = 0x5D4E37; // Brown for rocky terrain

enum MapType {
    ARENA,
    URBAN,
    FOREST,
    PLAINS,
    MOUNTAIN
}
let currentMapType: MapType | undefined = undefined;
let selectedMapType: MapType | 'random' = 'random';


const DEATHS_TO_LOSE = 3; // Changed from KILLS_TO_WIN
let myScore = 0;
let opponentScore = 0;
let isGameOver = false;

// New multiplayer death tracking system
const playerDeaths = new Map<string, number>(); // Track deaths per player
let myDeaths = 0; // Track local player deaths

// Helper functions for new victory system
function getPlayerDeaths(playerId: string): number {
    return playerDeaths.get(playerId) || 0;
}

function incrementPlayerDeaths(playerId: string): number {
    const currentDeaths = getPlayerDeaths(playerId) + 1;
    playerDeaths.set(playerId, currentDeaths);
    return currentDeaths;
}

function checkVictoryCondition(): boolean {
    // Victory condition: all OTHER players have 3 deaths
    const connectedIds = getConnectedPlayerIds();
    if (connectedIds.length === 0) return false; // No opponents
    
    for (const playerId of connectedIds) {
        console.log(`Checking deaths for player ${playerId}: ${getPlayerDeaths(playerId)}`);
        if (getPlayerDeaths(playerId) < DEATHS_TO_LOSE) {
            return false; // This player hasn't lost yet
        }
    }
    return true; // All opponents have 3 deaths
}

function checkDefeatCondition(): boolean {
    // Defeat condition: local player has 3 deaths
    return myDeaths >= DEATHS_TO_LOSE;
}




interface PlayerState {
  position: { x: number; y: number; z: number };
  quaternion: { x: number; y: number; z: number; w: number };
  aiming: boolean;
  weaponType: 'handgun' | 'sniper' | 'smg';
  isOnBike: boolean;
  bikeDirection?: number;
  bikeBankAngle?: number;
  bikePosition?: { x: number; y: number; z: number };
}

interface GameEventShootData {
    muzzlePosition: { x: number; y: number; z: number };
    direction: { x: number; y: number; z: number };
    weaponType: 'handgun' | 'sniper' | 'smg';
}

interface GameEventHitOpponentData {
    damageDealt: number;
    isHeadshot?: boolean;
    fromPlayerId?: string; // ID of the player who dealt the damage
}

interface GameEventGameOverData {
    winnerIsPlayerOne: boolean | null;
    defeatedPlayerId?: string;
}

interface GameEventMapSeedData {
    seed: number;
    mapType: MapType;
}

interface GameEventBikeHitData {
    damageDealt: number;
}

interface GameEventBikeExplodedData {
    playerPosition: { x: number; y: number; z: number };
}

interface GameEventStartGameRequestData {
    requesterId: string;
}

interface GameEventDefeatedData {
    defeatedPlayerId: string;
}

interface GameEvent {
  type: 'shoot' | 'hit_opponent' | 'i_was_defeated' | 'game_over_notif' | 'map_seed' | 'bike_hit' | 'bike_exploded' | 'start_game_request';
  data?: GameEventShootData | GameEventHitOpponentData | GameEventGameOverData | GameEventMapSeedData | GameEventBikeHitData | GameEventBikeExplodedData | GameEventStartGameRequestData | GameEventDefeatedData | any;
}

/**
 * Determines the map type based on a seed and user selection.
 * Uses a temporary PRNG for 'random' choice to avoid affecting the main game PRNG.
 */
function determineMapType(seedForChoice: number, selection: MapType | 'random'): MapType {
    if (selection === 'random') {
        const tempPrng = new PRNG(seedForChoice); // Use the provided seed for a temporary PRNG
        const randVal = tempPrng.next();
        if (randVal < 0.20) return MapType.ARENA;
        if (randVal < 0.40) return MapType.URBAN;
        if (randVal < 0.60) return MapType.FOREST;
        if (randVal < 0.80) return MapType.PLAINS;
        return MapType.MOUNTAIN;
    }
    return selection as MapType;
}


/**
 * Selects a random spawn point from a list, with optional conditions.
 * Uses the global 'prng' for randomness.
 */
function isSpawnPointSafe(position: THREE.Vector3): boolean {
    // Create a collision box around the spawn position
    const spawnCollider = new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(position.x, position.y - PLAYER_HEIGHT / 2 + PLAYER_RADIUS, position.z),
        new THREE.Vector3(PLAYER_RADIUS * 2, PLAYER_HEIGHT - PLAYER_RADIUS * 2, PLAYER_RADIUS * 2)
    );
    
    // Check collision with all map features
    for (const feature of mapFeatures) {
        const featureBoundingBox = new THREE.Box3().setFromObject(feature);
        if (spawnCollider.intersectsBox(featureBoundingBox)) {
            return false; // Collision detected
        }
    }
    
    return true; // Safe position
}

function selectRandomSpawnPoint(
    points: THREE.Vector3[],
    referencePosition?: THREE.Vector3,
    minDistance?: number,
    pointToExclude?: THREE.Vector3
): THREE.Vector3 {
    if (!spawnPrng) { // Should not happen if game logic is correct, but as a safeguard
        console.warn("selectRandomSpawnPoint called before spawn PRNG initialized. Using temporary PRNG.");
        const tempPrng = new PRNG(Date.now());
        return points[tempPrng.nextInt(0, points.length - 1)]?.clone() || new THREE.Vector3(0, PLAYER_HEIGHT, 0);
    }
    if (points.length === 0) {
        return new THREE.Vector3(0, PLAYER_HEIGHT, 0); 
    }

    let candidatePoints = points;
    if (pointToExclude) {
        candidatePoints = points.filter(p => !(p.x === pointToExclude.x && p.y === pointToExclude.y && p.z === pointToExclude.z));
    }

    if (candidatePoints.length === 0 && points.length > 0) {
        candidatePoints = points;
    }
    if (candidatePoints.length === 0) {
        return new THREE.Vector3(0, PLAYER_HEIGHT, 0);
    }
    
    let filteredByDistance: THREE.Vector3[] = [];
    if (referencePosition && typeof minDistance === 'number' && minDistance > 0) {
        filteredByDistance = candidatePoints.filter(p => {
            const dx = p.x - referencePosition.x;
            const dz = p.z - referencePosition.z;
            return Math.sqrt(dx * dx + dz * dz) >= minDistance;
        });
    }

    // Filter points by safety (no collision with map objects)
    let safePoints: THREE.Vector3[] = [];
    const pointsToCheck = filteredByDistance.length > 0 ? filteredByDistance : candidatePoints;
    
    for (const point of pointsToCheck) {
        if (isSpawnPointSafe(point)) {
            safePoints.push(point);
        }
    }
    
    // If no safe points found in filtered points, check all candidate points
    if (safePoints.length === 0 && filteredByDistance.length > 0) {
        for (const point of candidatePoints) {
            if (isSpawnPointSafe(point)) {
                safePoints.push(point);
            }
        }
    }
    
    // If still no safe points, check all original points
    if (safePoints.length === 0) {
        for (const point of points) {
            if (isSpawnPointSafe(point)) {
                safePoints.push(point);
            }
        }
    }
    
    // Return a safe point if available, otherwise fallback to center with warning
    if (safePoints.length > 0) {
        const selectedPoint = safePoints[spawnPrng.nextInt(0, safePoints.length - 1)].clone();
        return adjustSpawnPointToTerrain(selectedPoint);
    } else {
        console.warn('No safe spawn points found! Using fallback position.');
        const fallbackPoint = new THREE.Vector3(0, PLAYER_HEIGHT + 5, 0);
        return adjustSpawnPointToTerrain(fallbackPoint);
    }
}


function showTemporaryMessage(message: string, duration: number = 500) {
    if (isGameOver) return;

    // Create or get the notification element
    let notification = document.getElementById('corner-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'corner-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            z-index: 1001;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 200px;
            word-wrap: break-word;
            display: none;
        `;
        document.body.appendChild(notification);
    }

    // Show the notification
    notification.textContent = message;
    notification.style.display = 'block';

    // Hide after duration
    setTimeout(() => {
        if (notification) {
            notification.style.display = 'none';
        }
    }, duration);
}

// WebSocket Signaling Functions
function connectToSignalingServer(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signalingSocket && signalingSocket.readyState === WebSocket.OPEN) {
            resolve();
            return;
        }

        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${wsProtocol}//${window.location.host}/ws`;
        
        signalingSocket = new WebSocket(wsUrl);
        
        signalingSocket.onopen = () => {
            console.log('Connected to signaling server');
            if (p2pStatusText) p2pStatusText.textContent = 'Status: Connected to server';
            resolve();
        };
        
        signalingSocket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                handleSignalingMessage(message);
            } catch (error) {
                console.error('Error parsing signaling message:', error);
            }
        };
        
        signalingSocket.onclose = () => {
            console.log('Disconnected from signaling server');
            if (p2pStatusText) p2pStatusText.textContent = 'Status: Disconnected';
            signalingSocket = null;
            clientId = null;
        };
        
        signalingSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            reject(error);
        };
        
        // Timeout after 10 seconds
        setTimeout(() => {
            if (signalingSocket && signalingSocket.readyState !== WebSocket.OPEN) {
                reject(new Error('Connection timeout'));
            }
        }, 10000);
    });
}

function handleSignalingMessage(message: any) {
    
    
    switch (message.msg_type) {
        case 'welcome':
            clientId = message.data.client_id;
        
            break;
            
        case 'room-joined':
            
            currentRoom = message.data.room_id;
            const roomPlayers = message.data.players;
            const playerCount = message.data.player_count;
            
            // Update UI
            updatePlayerCountDisplay();
            if (p2pStatusText) {
                p2pStatusText.textContent = `Status: In room ${currentRoom} with ${playerCount} players`;
            }
            
            // For each existing player in the room, establish P2P connection
            for (const playerId of roomPlayers) {
                if (playerId !== clientId && !peerConnections.has(playerId)) {
                    console.log('Establishing connection to existing player:', playerId);
                    startAutomaticPeerConnection(true, playerId); // We create offer to existing players
                }
            }
            break;
            
        case 'room-error':
            console.error('Room join error:', message.data.error);
            if (p2pStatusText) {
                p2pStatusText.textContent = `Error: ${message.data.error}`;
            }
            isWaitingForOpponent = false;
            break;
            
        case 'user-joined':
            console.log('New user joined room:', message.data);
            const newUserId = message.data.user_id;
            const newPlayerCount = message.data.player_count;
            
            // Update UI
            updatePlayerCountDisplay();
            if (p2pStatusText) {
                p2pStatusText.textContent = `Status: In room ${currentRoom} with ${newPlayerCount} players`;
            }
            
            // Wait for the new player to send us an offer (they should be creating offers to existing players)
            // No action needed here - we'll handle the offer when it arrives
            break;
            
        case 'user-left':
            
            const leftUserId = message.data.user_id;
            
            // Clean up P2P connection for the departed player
            if (peerConnections.has(leftUserId)) {
                const connection = peerConnections.get(leftUserId);
                connection?.close();
                peerConnections.delete(leftUserId);
            }
            
            if (dataChannels.has(leftUserId)) {
                const channel = dataChannels.get(leftUserId);
                channel?.close();
                dataChannels.delete(leftUserId);
            }
            
            // Remove from connected players
            connectedPlayers.delete(leftUserId);
            
            // Remove remote player meshes
            removeRemotePlayerMeshes(leftUserId);
            
            // Update legacy variables
            updateLegacyVariables();
            break;
            
        case 'offer':
            if (message.sender !== clientId) {
                handleRemoteOffer(message.data, message.sender);
            }
            break;
            
        case 'answer':
            if (message.sender !== clientId) {
                handleRemoteAnswer(message.data, message.sender);
            }
            break;
            
        case 'ice-candidate':
            if (message.sender !== clientId) {
                handleRemoteIceCandidate(message.data, message.sender);
            }
            break;
    }
}

function joinRoom(roomId: string, maxPlayers: number = 6) {
    if (!signalingSocket || signalingSocket.readyState !== WebSocket.OPEN) {
        console.error('Not connected to signaling server');
        return;
    }
    
    currentRoom = roomId;
    isWaitingForOpponent = true;
    
    const joinMessage = {
        msg_type: 'join-room',
        data: { 
            room_id: roomId,
            max_players: maxPlayers
        },
        target: null,
        sender: clientId
    };
    
    signalingSocket.send(JSON.stringify(joinMessage));
    console.log('Joining room:', roomId, 'with max players:', maxPlayers);
    
    if (p2pStatusText) p2pStatusText.textContent = `Status: Joining room ${roomId}...`;
    
    // Set timeout for matchmaking
    if (matchmakingTimeout) clearTimeout(matchmakingTimeout);
    matchmakingTimeout = window.setTimeout(() => {
        if (isWaitingForOpponent) {
            console.log('Matchmaking timeout, starting game with default settings');
            if (p2pStatusText) p2pStatusText.textContent = 'Status: Timeout, starting solo';
            // Fall back to single player or try another room
        }
    }, 30000); // 30 second timeout
}

// Add opponent tracking variable
let opponentClientId: string | null = null;

// Mouse sensitivity setting
let mouseSensitivity = 1.0; // Default sensitivity multiplier

// Create a peer connection for a specific player
async function initPeerConnectionForPlayer(playerId: string): Promise<RTCPeerConnection> {
    console.log("Initializing PeerConnection for player:", playerId);
    
    // Close existing connection if it exists
    if (peerConnections.has(playerId)) {
        const existingConnection = peerConnections.get(playerId);
        if (existingConnection && existingConnection.signalingState !== 'closed') {
            console.log("Closing existing PeerConnection for:", playerId);
            existingConnection.close();
        }
    }
    
    const rtcConfig = await getIceServersConfiguration();
    const connection = new RTCPeerConnection(rtcConfig);
    console.log("PeerConnection created for player:", playerId, "with configuration:", rtcConfig);
    
    // Store the connection
    peerConnections.set(playerId, connection);
    
    // Set up event handlers
    connection.onicecandidate = (event) => {
        if (event.candidate) {
            console.log("Local ICE candidate gathered for player:", playerId, event.candidate);
            sendSignalingMessage('ice-candidate', event.candidate, playerId);
        }
    };
    
    connection.onconnectionstatechange = () => {
        console.log(`Connection state for ${playerId}:`, connection.connectionState);
        if (connection.connectionState === 'connected') {
            console.log(`P2P connection established with ${playerId}`);
            updatePlayerCountDisplay();
            if (p2pStatusText) p2pStatusText.textContent = `Status: Connected to ${getConnectedPlayerIds().length} players`;
        } else if (connection.connectionState === 'disconnected' || connection.connectionState === 'failed') {
            console.log(`P2P connection lost with ${playerId}`);
            // Clean up this connection
            peerConnections.delete(playerId);
            dataChannels.delete(playerId);
            connectedPlayers.delete(playerId);
            
            // Remove remote player meshes
            removeRemotePlayerMeshes(playerId);
            
            updateLegacyVariables();
            updatePlayerCountDisplay();
        }
    };
    
    // Create data channel for this peer
    const channel = connection.createDataChannel('gameData', { ordered: false });
    setupDataChannelForPlayer(channel, playerId);
    dataChannels.set(playerId, channel);
    
    // Handle incoming data channels
    connection.ondatachannel = (event) => {
        
        const receivedChannel = event.channel;
        setupDataChannelForPlayer(receivedChannel, playerId);
        dataChannels.set(playerId, receivedChannel);
    };
    
    return connection;
}

// Create an offer for a specific player
async function createOfferForPlayer(playerId: string) {
    const connection = peerConnections.get(playerId);
    if (!connection) {
        console.error('No peer connection found for player:', playerId);
        return;
    }
    
    try {
        console.log('Creating offer for player:', playerId);
        const offer = await connection.createOffer();
        await connection.setLocalDescription(offer);
        console.log('Local description set, sending offer to:', playerId);
        
        sendSignalingMessage('offer', offer, playerId);
    } catch (error) {
        console.error('Error creating offer for player:', playerId, error);
    }
}

// Set up data channel event handlers for a specific player
function setupDataChannelForPlayer(channel: RTCDataChannel, playerId: string) {
    channel.onopen = () => {
        console.log(`Data channel opened for player: ${playerId}`);
        connectedPlayers.set(playerId, { playerId, isConnected: true });
        updateLegacyVariables();
        updatePlayerCountDisplay();
        
        if (p2pStatusText) {
            p2pStatusText.textContent = `Status: Connected to ${getConnectedPlayerIds().length} players`;
        }
    };
    
    channel.onclose = () => {
        console.log(`Data channel closed for player: ${playerId}`);
        connectedPlayers.delete(playerId);
        updateLegacyVariables();
        updatePlayerCountDisplay();
    };
    
    channel.onmessage = (event) => {
        if (isGameOver && JSON.parse(event.data as string).type !== 'game_over_notif') return;
        try {
            const message = JSON.parse(event.data as string);
            handleDataChannelMessage(message, playerId);
        } catch (error) {
            console.error(`Error parsing message from ${playerId}:`, error);
        }
    };
}

// Send a signaling message to a specific player
function sendSignalingMessage(messageType: string, data: any, targetPlayer: string) {
    if (!signalingSocket || signalingSocket.readyState !== WebSocket.OPEN) {
        console.error('Cannot send signaling message: not connected to server');
        return;
    }
    
    const message = {
        msg_type: messageType,
        data: data,
        target: targetPlayer,
        sender: clientId
    };
    
    signalingSocket.send(JSON.stringify(message));
    
}

// Create 3D text label for player ID
function createPlayerIdLabel(playerId: string): THREE.Mesh {
    const shortId = playerId.substring(0, 8);
    
    // Create canvas for text
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 64;
    
    // Draw text on canvas
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.font = 'bold 24px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(shortId, canvas.width / 2, canvas.height / 2);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    // Create material and geometry
    const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        transparent: true,
        alphaTest: 0.1,
        side: THREE.DoubleSide
    });
    const geometry = new THREE.PlaneGeometry(1, 0.25);
    
    const labelMesh = new THREE.Mesh(geometry, material);
    labelMesh.name = `playerIdLabel_${playerId}`;
    
    // Make label always face camera
    labelMesh.lookAt(camera.position);
    
    return labelMesh;
}

// Update all player ID labels to face the camera
function updatePlayerIdLabels(): void {
    if (!camera) return;
    
    scene.traverse((child) => {
        if (child.name && child.name.startsWith('playerIdLabel_')) {
            child.lookAt(camera.position);
        }
    });
}

// Create remote player meshes for a specific player
function createRemotePlayerMeshes(playerId: string): RemotePlayerMeshes {
    
    const remotePlayerMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff4500, 
        roughness: 0.6, 
        metalness: 0.3 
    });
    
    const mainMesh = new THREE.Group();
    mainMesh.name = `remotePlayer_${playerId}`;

    // Head
    const headGeometry = new THREE.SphereGeometry(REMOTE_PLAYER_HEAD_RADIUS, 16, 12);
    const headMesh = new THREE.Mesh(headGeometry, remotePlayerMaterial);
    headMesh.position.y = REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y + REMOTE_PLAYER_HEAD_RADIUS;
    headMesh.castShadow = true;
    headMesh.receiveShadow = true;
    mainMesh.add(headMesh);

    // Torso
    const torsoGeometry = new THREE.BoxGeometry(REMOTE_PLAYER_TORSO_SIZE.x, REMOTE_PLAYER_TORSO_SIZE.y, REMOTE_PLAYER_TORSO_SIZE.z);
    const torsoMesh = new THREE.Mesh(torsoGeometry, remotePlayerMaterial);
    torsoMesh.position.y = REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y / 2;
    torsoMesh.castShadow = true;
    torsoMesh.receiveShadow = true;
    mainMesh.add(torsoMesh);

    // Legs
    const legsGeometry = new THREE.BoxGeometry(REMOTE_PLAYER_LEGS_SIZE.x, REMOTE_PLAYER_LEGS_SIZE.y, REMOTE_PLAYER_LEGS_SIZE.z);
    const legsMesh = new THREE.Mesh(legsGeometry, remotePlayerMaterial);
    legsMesh.position.y = REMOTE_PLAYER_LEGS_SIZE.y / 2;
    legsMesh.castShadow = true;
    legsMesh.receiveShadow = true;
    mainMesh.add(legsMesh);

    // Weapons
    const remoteGunMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    
    // Handgun
    const remoteHandgunGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
    const handgunMesh = new THREE.Mesh(remoteHandgunGeom, remoteGunMaterial);
    handgunMesh.castShadow = true;
    handgunMesh.visible = true;
    mainMesh.add(handgunMesh);

    // Sniper
    const remoteSniperGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const sniperMesh = new THREE.Mesh(remoteSniperGeom, remoteGunMaterial);
    sniperMesh.castShadow = true;
    sniperMesh.visible = false;
    mainMesh.add(sniperMesh);

    // SMG
    const remoteSMGGeom = new THREE.BoxGeometry(0.08, 0.08, 0.5);
    const smgMesh = new THREE.Mesh(remoteSMGGeom, remoteGunMaterial);
    smgMesh.castShadow = true;
    smgMesh.visible = false;
    mainMesh.add(smgMesh);

    // Add player ID label above the player
    const playerIdLabel = createPlayerIdLabel(playerId);
    playerIdLabel.position.set(0, REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y + REMOTE_PLAYER_HEAD_RADIUS * 2 + 0.5, 0);
    mainMesh.add(playerIdLabel);

    scene.add(mainMesh);

    const meshes: RemotePlayerMeshes = {
        mainMesh,
        handgunMesh,
        sniperMesh,
        smgMesh
    };

    remotePlayerMeshes.set(playerId, meshes);
    
    // Update legacy variables for the first (primary) player
    updateLegacyRemotePlayerVariables();
    
    return meshes;
}

// Remove remote player meshes for a specific player
function removeRemotePlayerMeshes(playerId: string) {
    
    const meshes = remotePlayerMeshes.get(playerId);
    if (meshes) {
        // Remove from scene
        scene.remove(meshes.mainMesh);
        
        // Remove bike if it exists
        if (meshes.bikeModel) {
            scene.remove(meshes.bikeModel);
        }
        
        // Clean up geometry and materials
        meshes.mainMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        
        remotePlayerMeshes.delete(playerId);
        
        // Update legacy variables
        updateLegacyRemotePlayerVariables();
    }
}

// Update legacy variables for backward compatibility
function updateLegacyRemotePlayerVariables() {
    const primaryOpponentId = getPrimaryOpponentId();
    if (primaryOpponentId && remotePlayerMeshes.has(primaryOpponentId)) {
        const meshes = remotePlayerMeshes.get(primaryOpponentId)!;
        remotePlayerMesh = meshes.mainMesh;
        remotePlayerHandgunMesh = meshes.handgunMesh;
        remotePlayerSniperMesh = meshes.sniperMesh;
        remotePlayerSMGMesh = meshes.smgMesh;
        remotePlayerBikeModel = meshes.bikeModel || null;
    } else {
        remotePlayerMesh = null;
        remotePlayerHandgunMesh = null;
        remotePlayerSniperMesh = null;
        remotePlayerSMGMesh = null;
        remotePlayerBikeModel = null;
    }
}

// Update weapon display for a specific remote player
function updateRemotePlayerWeaponForPlayer(playerId: string, aiming: boolean, weaponType: 'handgun' | 'sniper' | 'smg') {
    const meshes = remotePlayerMeshes.get(playerId);
    if (!meshes) return;
    
    // Hide all weapons first
    meshes.handgunMesh.visible = false;
    meshes.sniperMesh.visible = false;
    meshes.smgMesh.visible = false;
    
    // Show and position the active weapon
    let activeMesh: THREE.Mesh;
    let hipOffset: THREE.Vector3;
    let adsOffset: THREE.Vector3;
    
    switch (weaponType) {
        case 'handgun':
            activeMesh = meshes.handgunMesh;
            hipOffset = REMOTE_HANDGUN_HIP_OFFSET;
            adsOffset = REMOTE_HANDGUN_ADS_OFFSET;
            break;
        case 'sniper':
            activeMesh = meshes.sniperMesh;
            hipOffset = REMOTE_SNIPER_HIP_OFFSET;
            adsOffset = REMOTE_SNIPER_ADS_OFFSET;
            break;
        case 'smg':
            activeMesh = meshes.smgMesh;
            hipOffset = REMOTE_SMG_HIP_OFFSET;
            adsOffset = REMOTE_SMG_ADS_OFFSET;
            break;
    }
    
    activeMesh.visible = true;
    
    // Position weapon based on aiming state
    if (aiming) {
        activeMesh.position.copy(adsOffset);
        activeMesh.rotation.x = 0;
    } else {
        activeMesh.position.copy(hipOffset);
        activeMesh.rotation.x = Math.PI / 2;
    }
}

// Update bike display for a specific remote player
function updateRemotePlayerBikeForPlayer(playerId: string, state: PlayerState) {
    const meshes = remotePlayerMeshes.get(playerId);
    if (!meshes) return;
    
    if (state.isOnBike) {

        
        // Create bike model if it doesn't exist
        if (!meshes.bikeModel) {
            meshes.bikeModel = createBikeModel();
            meshes.bikeModel.name = `remoteBike_${playerId}`;
            scene.add(meshes.bikeModel);
            
        }
        
        // Use bike position if available, otherwise fall back to player position
        const bikePos = state.bikePosition || state.position;
        let bikeY = bikePos.y;
        
        // For bike mode, trust the sent position more and apply minimal adjustment
        if (currentMapType === MapType.MOUNTAIN && state.bikePosition) {
            // Only apply terrain adjustment if significantly below expected height
            const terrainHeight = getTerrainHeightAt(bikePos.x, bikePos.z);
            if (bikeY < terrainHeight - 1) {
                bikeY = terrainHeight;
            }
        }
        
        // Position bike
        meshes.bikeModel.position.set(bikePos.x, bikeY, bikePos.z);
        
        // Set bike rotation
        if (typeof state.bikeDirection === 'number') {
            meshes.bikeModel.rotation.y = state.bikeDirection;
        }
        
        if (typeof state.bikeBankAngle === 'number') {
            meshes.bikeModel.rotation.z = state.bikeBankAngle;
        }
        
        // Position player on bike (similar to bike position but slightly elevated)
        const playerOnBikePos = {
            x: bikePos.x,
            y: bikeY + 1.5, // Elevate player above bike
            z: bikePos.z
        };
        meshes.mainMesh.position.set(playerOnBikePos.x, playerOnBikePos.y, playerOnBikePos.z);
        
        // Apply same rotation as bike for player (ensure perfect alignment)
        if (typeof state.bikeDirection === 'number') {
            // Match bike direction exactly - no offset needed for remote players
            meshes.mainMesh.rotation.y = state.bikeDirection;
        }
        if (typeof state.bikeBankAngle === 'number') {
            // Match bike banking exactly for realistic riding position
            meshes.mainMesh.rotation.z = state.bikeBankAngle;
        }
        
        // Ensure player is upright relative to bike
        meshes.mainMesh.rotation.x = 0; // Keep player torso upright
        
        
        
        // Show both bike and player
        meshes.bikeModel.visible = true;
        meshes.mainMesh.visible = true; // Keep player visible on bike
        
       
    } else {
        // Hide bike when not in use
        if (meshes.bikeModel) {
            meshes.bikeModel.visible = false;
        }
        meshes.mainMesh.visible = true; // Show player model
        
    }
}

// Handle remote game events from other players
function handleRemoteGameEvent(gameEvent: GameEvent, senderId?: string) {
    if (gameEvent.type === 'map_seed' && !isPlayerOne) { 
        const seedData = gameEvent.data as GameEventMapSeedData;
        currentMapSeed = seedData.seed;
        currentMapType = seedData.mapType; 
        prng = new PRNG(currentMapSeed!); 
        spawnPrng = new PRNG(currentMapSeed! + getSpawnSeedOffset()); 
        console.log("Received and set map seed:", currentMapSeed, "and map type:", currentMapType);
        resetGameScene(); 
    }
    else if (gameEvent.type === 'shoot' && gameEvent.data) {
         const shootData = gameEvent.data as GameEventShootData;
         if (shootData.muzzlePosition && shootData.direction) {
            const projectileMesh = new THREE.Mesh(projectileGeometry, remoteProjectileMaterial); 
            projectileMesh.castShadow = true;
            projectileMesh.position.set(shootData.muzzlePosition.x, shootData.muzzlePosition.y, shootData.muzzlePosition.z);
            
            let speed = weaponStatsDB.handgun.projectileSpeed!; // Default
            if (shootData.weaponType === 'sniper' && weaponStatsDB.sniper.projectileSpeed) {
                speed = weaponStatsDB.sniper.projectileSpeed;
            } else if (shootData.weaponType === 'smg' && weaponStatsDB.smg.projectileSpeed) {
                speed = weaponStatsDB.smg.projectileSpeed;
            }
            
            const remoteProj: RemoteProjectile = {
                mesh: projectileMesh,
                velocity: new THREE.Vector3(shootData.direction.x, shootData.direction.y, shootData.direction.z).multiplyScalar(speed),
                lifeTime: 0,
                spawnTime: performance.now(),
                weaponType: shootData.weaponType,
                distanceTraveled: 0,
                initialPosition: new THREE.Vector3(shootData.muzzlePosition.x, shootData.muzzlePosition.y, shootData.muzzlePosition.z)
            };
            scene.add(projectileMesh);
            remoteProjectiles.push(remoteProj);
         }
    }
    else if (gameEvent.type === 'hit_opponent') {
        if(isGameOver) return;
        const hitData = gameEvent.data as GameEventHitOpponentData;
        
        // Use the new health system
        takeDamage(hitData.damageDealt);

        const hitOverlay = document.createElement('div');
        hitOverlay.style.position = 'absolute'; hitOverlay.style.top = '0'; hitOverlay.style.left = '0';
        hitOverlay.style.width = '100%'; hitOverlay.style.height = '100%';
        
        
        
        hitOverlay.style.zIndex = '1000';
        document.body.appendChild(hitOverlay);
        setTimeout(() => { if (document.body.contains(hitOverlay)) document.body.removeChild(hitOverlay); }, 150);
        
        // Different messages for headshots
        const hitMessage = hitData.isHeadshot 
            ? `HEADSHOT! -${hitData.damageDealt} HP | Health: ${Math.round(currentHealth)}`
            : `HIT! -${hitData.damageDealt} HP | Health: ${Math.round(currentHealth)}`;
        showTemporaryMessage(hitMessage, 500);

        if (currentHealth <= 0) {
            myDeaths++;
            console.log(`myDeaths incremented to: ${myDeaths}`);
            // Send defeat notification to other players with my player ID
            sendGameEventToOtherPlayers({ 
                type: 'i_was_defeated',
                data: { defeatedPlayerId: clientId || 'unknown' } as GameEventDefeatedData
            });
            
            
            if (checkDefeatCondition()) {
                handleGameOver(false);
                return;
            }
            
            // Reset spawn point after death
            currentHealth = MAX_HEALTH;
            triggerRespawn();
        }
    }
    else if (gameEvent.type === 'i_was_defeated') {
        if(isGameOver) return;
        // A player was defeated - get the specific player ID
        const defeatedData = gameEvent.data as GameEventDefeatedData;
        if (defeatedData && defeatedData.defeatedPlayerId) {
            incrementPlayerDeaths(defeatedData.defeatedPlayerId);
            
            
            if (checkVictoryCondition()) {
                handleGameOver(true);
                return;
            }
        }
        showTemporaryMessage("Enemy player defeated!", 500);
    }
    else if (gameEvent.type === 'game_over_notif') {
        const gameOverData = gameEvent.data as GameEventGameOverData;
        console.log("Received game over notification:", gameOverData);
        // Remove the defeated player's mesh from the scene
        if (gameOverData.defeatedPlayerId) {
            console.log(`Removing mesh for defeated player: ${gameOverData.defeatedPlayerId}`);
            removeRemotePlayerMeshes(gameOverData.defeatedPlayerId);
        } else if (senderId) {
            // Fallback: use senderId if defeatedPlayerId is not available
            console.log(`Removing mesh for defeated player (fallback): ${senderId}`);
            removeRemotePlayerMeshes(senderId);
        }
    }
    else if (gameEvent.type === 'bike_hit') {
        const bikeHitData = gameEvent.data as GameEventBikeHitData;
        takeDamage(bikeHitData.damageDealt);
        showTemporaryMessage(`Bike collision! -${bikeHitData.damageDealt} HP`, 500);
    }
    else if (gameEvent.type === 'bike_exploded') {
        const bikeExplosionData = gameEvent.data as GameEventBikeExplodedData;
        showTemporaryMessage("Enemy bike exploded!", 500);
    }
    else if (gameEvent.type === 'start_game_request') {
        const requestData = gameEvent.data as GameEventStartGameRequestData;
        showTemporaryMessage(`${requestData.requesterId} wants to start the game`, 500);
        
        // Auto-accept game start requests in multiplayer
        if (gameMode === 'multiplayer') {
            startGameFromRequest();
        }
    }
}

// Handle incoming data channel messages from a specific player
function handleDataChannelMessage(message: any, senderId: string) {
    if (message.type === 'playerState') {
        const state = message.data as PlayerState;
        
        // Ensure remote player meshes exist for this sender
        if (!remotePlayerMeshes.has(senderId)) {
            createRemotePlayerMeshes(senderId);
        }
        
        const meshes = remotePlayerMeshes.get(senderId)!;
        
        // Adjust remote player position for terrain height
        let adjustedY = state.position.y - PLAYER_HEIGHT;
        if (currentMapType === MapType.MOUNTAIN) {
            const terrainHeight = getTerrainHeightAt(state.position.x, state.position.z);
            // Ensure player is at least at terrain height
            adjustedY = Math.max(adjustedY, terrainHeight);
        }

        
        meshes.mainMesh.position.set(state.position.x, adjustedY, state.position.z);
        meshes.mainMesh.quaternion.set(state.quaternion.x, state.quaternion.y, state.quaternion.z, state.quaternion.w);
        
        updateRemotePlayerWeaponForPlayer(senderId, state.aiming, state.weaponType);
        updateRemotePlayerBikeForPlayer(senderId, state);
        
        // Update legacy variables if this is the primary opponent
        updateLegacyRemotePlayerVariables();
        
    } else if (message.type === 'gameEvent') {
        handleRemoteGameEvent(message.data as GameEvent, senderId);
    }
}

async function startAutomaticPeerConnection(shouldCreateOffer: boolean, targetOpponentId?: string) {
    try {
        if (!targetOpponentId) {
            console.error('Target opponent ID is required for peer connection');
            return;
        }
        
        // Don't create duplicate connections
        if (peerConnections.has(targetOpponentId)) {
            console.log('Connection already exists for:', targetOpponentId);
            return;
        }
        
        console.log('Starting peer connection to:', targetOpponentId);
        await initPeerConnectionForPlayer(targetOpponentId);
        
        if (shouldCreateOffer) {
            await createOfferForPlayer(targetOpponentId);
        }
        
        isWaitingForOpponent = false;
        if (matchmakingTimeout) {
            clearTimeout(matchmakingTimeout);
            matchmakingTimeout = null;
        }
        
    } catch (error) {
        console.error('Error in automatic peer connection:', error);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Connection failed';
    }
}



async function handleRemoteOffer(offer: RTCSessionDescriptionInit, senderId: string) {
    console.log('Received offer from:', senderId);
    
    // Create peer connection for this sender if it doesn't exist
    if (!peerConnections.has(senderId)) {
        await initPeerConnectionForPlayer(senderId);
    }
    
    const connection = peerConnections.get(senderId);
    if (!connection) {
        console.error('Failed to get peer connection for:', senderId);
        return;
    }
    
    try {
        await connection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await connection.createAnswer();
        await connection.setLocalDescription(answer);
        
        console.log('Created answer for:', senderId);
        sendSignalingMessage('answer', answer, senderId);
        
    } catch (error) {
        console.error('Error handling remote offer:', error);
    }
}

async function handleRemoteAnswer(answer: RTCSessionDescriptionInit, senderId: string) {
    const connection = peerConnections.get(senderId);
    if (!connection) {
        console.error('Peer connection not found for sender:', senderId);
        return;
    }
    
    try {
        await connection.setRemoteDescription(new RTCSessionDescription(answer));
        console.log('Set remote answer successfully for peer:', senderId);
        
        // Update legacy variable for backward compatibility
        updateLegacyVariables();
    } catch (error) {
        console.error('Error handling remote answer from', senderId, ':', error);
    }
}

async function handleRemoteIceCandidate(candidateData: any, senderId: string) {
    const connection = peerConnections.get(senderId);
    if (!connection) {
        console.error('Peer connection not found for sender:', senderId);
        return;
    }
    
    try {
        const candidate = new RTCIceCandidate(candidateData);
        await connection.addIceCandidate(candidate);
        console.log('Added remote ICE candidate for peer:', senderId);
    } catch (error) {
        console.error('Error adding remote ICE candidate from', senderId, ':', error);
    }
}

function initializeApp() {
  if (!mainMenuDiv || !instructionOverlay || !gameContainer || !startSinglePlayerButton || !startMultiplayerButton || !signalingPanel || !localSdpTextarea || !remoteSdpTextarea || !localIceTextarea || !remoteIceTextarea || !p2pStatusText || !scopeOverlay || !copyLocalSdpBtn || !copyLocalIceBtn) {
    console.error("Required UI elements not found!");
    return;
  }
  isPlayerOne = null;

  startSinglePlayerButton.addEventListener('click', () => {
    gameMode = 'singleplayer';
    if (signalingPanel) signalingPanel.style.display = 'none';
    if (p2pInstructionText) p2pInstructionText.style.display = 'none';
    startGame();
  });

  startMultiplayerButton.addEventListener('click', async () => {
    gameMode = 'multiplayer';
    
    try {
      if (p2pStatusText) p2pStatusText.textContent = 'Status: Connecting to server...';
      
      await connectToSignalingServer();
      
      // Generate a room ID based on map selection and timestamp
      const roomPrefix = selectedMapType === 'random' ? 'any' : selectedMapType.toString();
      const roomId = `${roomPrefix}_${Math.floor(Date.now() / 60000)}`; // Changes every 60 seconds
      
      joinRoom(roomId);
      
      // Hide manual P2P panel and show automatic status
      if (signalingPanel) signalingPanel.style.display = 'none';
      if (p2pInstructionText) p2pInstructionText.style.display = 'none';
      
      startGame();
      
    } catch (error) {
      console.error('Failed to connect to signaling server:', error);
      if (p2pStatusText) p2pStatusText.textContent = 'Status: Connection failed, using manual mode';
      
      // Fall back to manual P2P mode
      if (signalingPanel) signalingPanel.style.display = 'block';
      if (p2pInstructionText) p2pInstructionText.style.display = 'block';
      startGame();
    }
  });

  createOfferBtn.addEventListener('click', createOffer);
  createAnswerBtn.addEventListener('click', createAnswer);
  setRemoteSdpBtn.addEventListener('click', setRemoteDescription);
  addRemoteIceBtn.addEventListener('click', addRemoteIceCandidate);
  
  // Game start request button event listener
  startGameRequestBtn.addEventListener('click', () => {
    const connectedCount = getConnectedPlayerIds().length;
    if (connectedCount > 0 && gameMode === 'multiplayer') {
      // Generate map seed and initialize PRNG
      currentMapSeed = Date.now();
      currentMapType = determineMapType(currentMapSeed, selectedMapType);
      prng = new PRNG(currentMapSeed);
      spawnPrng = new PRNG(currentMapSeed + getSpawnSeedOffset());
      
      console.log(`Game initiator: Generated seed=${currentMapSeed}, type=${currentMapType}`);
      
      // Send map seed to all connected players
      const mapSeedEvent: GameEvent = {
        type: 'map_seed',
        data: { seed: currentMapSeed, mapType: currentMapType } as GameEventMapSeedData
      };
      sendGameEventToAllPlayers(mapSeedEvent);
      
      // Send start game request to all connected players
      const startGameEvent: GameEvent = {
        type: 'start_game_request',
        data: { requesterId: clientId || 'unknown' } as GameEventStartGameRequestData
      };
      sendGameEventToAllPlayers(startGameEvent);
      
      // Start the game locally and initialize map
      startGameFromRequest();
      resetGameScene();
      
      showTemporaryMessage(`Game starting! Sent request to ${connectedCount} player(s).`, 500);
    } else {
      alert("No connected players to start the game with!");
    }
  });
  closeSignalingBtn.addEventListener('click', () => {
    if (dataChannel && dataChannel.readyState === 'open') {
      signalingPanel.style.display = 'none';
    } else {
      alert("Connect to a peer first!");
    }
  });

  copyLocalSdpBtn.addEventListener('click', async () => {
    if (localSdpTextarea && localSdpTextarea.value) {
        try {
            await navigator.clipboard.writeText(localSdpTextarea.value);
            const originalText = copyLocalSdpBtn.textContent;
            copyLocalSdpBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyLocalSdpBtn.textContent = originalText;
            }, 1500);
        } catch (err) {
            console.error('Failed to copy local SDP: ', err);
            alert('Failed to copy local SDP. See console for details.');
        }
    }
  });

  copyLocalIceBtn.addEventListener('click', async () => {
      if (localIceTextarea && localIceTextarea.value) {
          try {
              await navigator.clipboard.writeText(localIceTextarea.value);
              const originalText = copyLocalIceBtn.textContent;
              copyLocalIceBtn.textContent = 'Copied!';
              setTimeout(() => {
                  copyLocalIceBtn.textContent = originalText;
              }, 1500);
          } catch (err) {
              console.error('Failed to copy local ICE candidates: ', err);
              alert('Failed to copy local ICE candidates. See console for details.');
          }
      }
  });

  const mapArenaButton = document.getElementById('map-arena-btn') as HTMLButtonElement;
  const mapUrbanButton = document.getElementById('map-urban-btn') as HTMLButtonElement;
  const mapForestButton = document.getElementById('map-forest-btn') as HTMLButtonElement;
  const mapPlainsButton = document.getElementById('map-plains-btn') as HTMLButtonElement;
  const mapMountainButton = document.getElementById('map-mountain-btn') as HTMLButtonElement;
  const mapRandomButton = document.getElementById('map-random-btn') as HTMLButtonElement;
  const mapSelectionButtons = [mapArenaButton, mapUrbanButton, mapForestButton, mapPlainsButton, mapMountainButton, mapRandomButton];

  // Settings Panel Elements
  const settingsBtn = document.getElementById('settings-btn') as HTMLButtonElement;
  const settingsPanel = document.getElementById('settings-panel') as HTMLDivElement;
  const backToMenuBtn = document.getElementById('back-to-menu-btn') as HTMLButtonElement;
  const sensitivitySlider = document.getElementById('mouse-sensitivity-slider') as HTMLInputElement;
  const sensitivityValueSpan = document.getElementById('sensitivity-value') as HTMLSpanElement;

  // Instructions Modal Elements
  const instructionsBtn = document.getElementById('instructions-btn') as HTMLButtonElement;
  const instructionsModal = document.getElementById('instructions-modal') as HTMLDivElement;
  const closeInstructionsBtn = document.getElementById('close-instructions-btn') as HTMLButtonElement;

  if (!mapArenaButton || !mapUrbanButton || !mapForestButton || !mapPlainsButton || !mapMountainButton || !mapRandomButton || !settingsBtn || !settingsPanel || !backToMenuBtn || !sensitivitySlider || !sensitivityValueSpan || !instructionsBtn || !instructionsModal || !closeInstructionsBtn) {
      console.error("UI elements not found!");
      return;
  } else {
      function updateSelectedMapButton(selectedBtn: HTMLButtonElement) {
          mapSelectionButtons.forEach(btn => {
              if (btn) btn.classList.remove('selected-map');
          });
          if (selectedBtn) selectedBtn.classList.add('selected-map');
      }

      mapArenaButton.addEventListener('click', () => {
          selectedMapType = MapType.ARENA;
          updateSelectedMapButton(mapArenaButton);
      });
      mapUrbanButton.addEventListener('click', () => {
          selectedMapType = MapType.URBAN;
          updateSelectedMapButton(mapUrbanButton);
      });
      mapForestButton.addEventListener('click', () => {
          selectedMapType = MapType.FOREST;
          updateSelectedMapButton(mapForestButton);
      });
      mapPlainsButton.addEventListener('click', () => {
          selectedMapType = MapType.PLAINS;
          updateSelectedMapButton(mapPlainsButton);
      });
      mapMountainButton.addEventListener('click', () => {
          selectedMapType = MapType.MOUNTAIN;
          updateSelectedMapButton(mapMountainButton);
      });
      mapRandomButton.addEventListener('click', () => {
          selectedMapType = 'random';
          updateSelectedMapButton(mapRandomButton);
      });
      // Set default selected button visual state
      updateSelectedMapButton(mapRandomButton);
  }

  // Settings Panel Logic
  settingsBtn.addEventListener('click', () => {
    mainMenuDiv.style.display = 'none';
    settingsPanel.style.display = 'flex';
  });

  backToMenuBtn.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
    mainMenuDiv.style.display = 'flex';
  });

  sensitivitySlider.addEventListener('input', () => {
    const value = parseFloat(sensitivitySlider.value);
    sensitivityValueSpan.textContent = value.toFixed(1);
    mouseSensitivity = value;
    if (controls) {
      controls.sensitivity = 0.002 * mouseSensitivity;
    }
    // Save to localStorage
    localStorage.setItem('mouseSensitivity', value.toString());
  });

  // Instructions Modal Logic
  instructionsBtn.addEventListener('click', () => {
    mainMenuDiv.style.display = 'none';
    instructionsModal.style.display = 'flex';
  });

  closeInstructionsBtn.addEventListener('click', () => {
    instructionsModal.style.display = 'none';
    mainMenuDiv.style.display = 'flex';
  });

  // Load sensitivity from localStorage on startup
  const savedSensitivity = localStorage.getItem('mouseSensitivity');
  if (savedSensitivity) {
    const value = parseFloat(savedSensitivity);
    mouseSensitivity = value;
    sensitivitySlider.value = value.toString();
    sensitivityValueSpan.textContent = value.toFixed(1);
  }
}

function startGame() {
  if (!mainMenuDiv || !instructionOverlay || !gameContainer || !instructionText) return;
  mainMenuDiv.style.display = 'none';
  gameContainer.style.display = 'block';
  isGameOver = false; 

  if (gameMode === 'singleplayer') {
    instructionText.textContent = "Click to Start Single Player";
    currentMapSeed = Date.now(); 
    currentMapType = determineMapType(currentMapSeed, selectedMapType);
    prng = new PRNG(currentMapSeed); 
    spawnPrng = new PRNG(currentMapSeed + getSpawnSeedOffset());
    console.log(`SP Start: Seed=${currentMapSeed}, Type=${currentMapType}, Selected=${selectedMapType}`);
    
    // Initialize zombie system for single player
    gameStartTime = performance.now();
  } else if (gameMode === 'multiplayer') {
    instructionText.textContent = "Connect via P2P, then Click to Start";
    if (p2pInstructionText) p2pInstructionText.style.display = 'block';
    if (signalingPanel && (!dataChannel || dataChannel.readyState !== 'open')) {
        signalingPanel.style.display = 'block';
    }
    // Update player count display for multiplayer mode
    updatePlayerCountDisplay();
    // For multiplayer, map seed and type are set via P2P. PRNG is initialized then.
  }
  instructionOverlay.style.display = 'flex';

  if (!isGameInitialized) {
    initThreeJSGame(); 
  }
  
  // For single player, resetGameScene (which generates map) is called here.
  // For multiplayer, resetGameScene is triggered by P2P map seed exchange.
  if (gameMode === 'singleplayer') {
     resetGameScene(); 
  }
}

function resetP2PState() {
    console.log("Attempting to reset P2P state...");
    if (dataChannel) {
        console.log("Closing data channel");
        dataChannel.close();
        dataChannel = null;
    }
    if (peerConnection) {
        console.log("Closing peer connection");
        peerConnection.close();
        peerConnection = null;
    }
    if (localSdpTextarea) localSdpTextarea.value = '';
    if (remoteSdpTextarea) remoteSdpTextarea.value = '';
    if (localIceTextarea) localIceTextarea.value = '';
    if (remoteIceTextarea) remoteIceTextarea.value = '';
    isPlayerOne = null;
    currentMapSeed = null; 
    prng = null; 
    currentMapType = undefined; 
    if (p2pStatusText) p2pStatusText.textContent = 'Status: Disconnected';
    if (gameMode === 'multiplayer' && signalingPanel) {
        if (!dataChannel || dataChannel.readyState !== 'open') {
             signalingPanel.style.display = 'block';
        }
    }
    console.log("P2P State Reset Complete");
}

function resetGameScene() {
    currentHealth = MAX_HEALTH; // Also reset new health system
    myScore = 0;
    opponentScore = 0;
    isGameOver = false;
    
    // Reset new multiplayer death tracking system
    myDeaths = 0;
    playerDeaths.clear();
    lastFireTime = 0;
    isFiringSMGActual = false;
    
    // Initialize zombie system for single player
    if (gameMode === 'singleplayer') {
        resetGameState();
        gameStartTime = performance.now();
    }
    
    


    if (gameMode === 'singleplayer') {
        if (!prng || currentMapSeed === null || currentMapSeed === undefined) {
            console.warn("SP resetGameScene: PRNG or MapSeed missing. This should have been set by startGame. Re-initializing as a fallback.");
            currentMapSeed = currentMapSeed ?? Date.now(); 
            currentMapType = determineMapType(currentMapSeed, selectedMapType); 
            prng = new PRNG(currentMapSeed); 
            spawnPrng = new PRNG(currentMapSeed + getSpawnSeedOffset()); 
        } else if (currentMapType === undefined || currentMapType === null) { 
             console.warn("SP resetGameScene: currentMapType missing, but PRNG/seed exists. Re-determining map type.");
             currentMapType = determineMapType(currentMapSeed!, selectedMapType); 
        }
    } else if (gameMode === 'multiplayer') {
        if (!prng || currentMapSeed === null || currentMapSeed === undefined) {
            console.error("MP resetGameScene: PRNG or map seed is NOT INITIALIZED. Map generation may fail or desync.");
        }
        if (currentMapType === undefined || currentMapType === null) {
             console.error("MP resetGameScene: currentMapType is NOT SET. Map features might not generate as expected or desync.");
        }
    }

    if (!prng) {
        console.warn("resetGameScene Fallback: PRNG still not initialized. Using random seed and Arena map as last resort.");
        currentMapSeed = Date.now();
        currentMapType = determineMapType(currentMapSeed, 'random'); 
        prng = new PRNG(currentMapSeed);
        spawnPrng = new PRNG(currentMapSeed + getSpawnSeedOffset());
    }
    console.log(`Resetting scene with: Mode=${gameMode}, Seed=${currentMapSeed}, Type=${currentMapType}, PRNG Valid: ${!!prng}`);
    if (prng) console.log(`PRNG Next (consumed for log): ${prng.next()}`);


    // Recreate ground with appropriate size for map type
    createGroundMesh();
    
    if (groundMesh && groundMesh.material instanceof THREE.MeshStandardMaterial) {
        let groundColor = ARENA_GROUND_COLOR;
        if (currentMapType === MapType.URBAN) groundColor = URBAN_GROUND_COLOR;
        else if (currentMapType === MapType.FOREST) groundColor = FOREST_GROUND_COLOR;
        else if (currentMapType === MapType.PLAINS) groundColor = PLAINS_GROUND_COLOR;
        else if (currentMapType === MapType.MOUNTAIN) groundColor = MOUNTAIN_GROUND_COLOR;
        groundMesh.material.color.setHex(groundColor);
    }

    if (scene && scene.fog instanceof THREE.Fog) {
        if (currentMapType === MapType.URBAN) {
            scene.fog.color.setHex(0xA0A0A0); 
            scene.fog.near = 0;
            scene.fog.far = 180; 
        } else if (currentMapType === MapType.FOREST) {
            scene.fog.color.setHex(0x2F4F2F); 
            scene.fog.near = 0;
            scene.fog.far = 120; 
        } else if (currentMapType === MapType.PLAINS) {
            scene.fog.color.setHex(0x87CEEB); // Light sky blue
            scene.fog.near = 0;
            scene.fog.far = 2000; // Extended to 2000m for long-range visibility
        } else if (currentMapType === MapType.MOUNTAIN) {
            scene.fog.color.setHex(0x6B8E60); // Mountain mist color
            scene.fog.near = 0;
            scene.fog.far = 400; // Medium distance for mountain terrain
        } else { 
            scene.fog.color.setHex(0x87ceeb); 
            scene.fog.near = 0;
            scene.fog.far = 250;
        }
    }
     if (scene) {
        let bgColor = 0x87ceeb; 
        if (currentMapType === MapType.URBAN) bgColor = 0x607D8B; 
        else if (currentMapType === MapType.FOREST) bgColor = 0x3A5F0B;
        else if (currentMapType === MapType.MOUNTAIN) bgColor = 0x4682B4; // Steel blue for mountain sky 
        scene.background = new THREE.Color(bgColor);
    }

    targetMeshes.forEach(target => {
        scene.remove(target);
        if (target.geometry) target.geometry.dispose();
        if (Array.isArray(target.material)) {
            target.material.forEach(m => m.dispose());
        } else if (target.material) {
            (target.material as THREE.Material).dispose();
        }
    });
    targetMeshes.clear();
    targetBoundingBoxCache.clear();

    projectiles.forEach(p => {
        scene.remove(p.mesh);
        if (p.mesh.geometry) p.mesh.geometry.dispose();
    });
    projectiles.length = 0;

    remoteProjectiles.forEach(p => {
        scene.remove(p.mesh);
        if (p.mesh.geometry) p.mesh.geometry.dispose();
    });
    remoteProjectiles.length = 0;

    pendingInputs.length = 0;

    mapFeatures.forEach(feature => {
        if (feature.parent === scene) scene.remove(feature);
        else if (feature.parent) feature.parent.remove(feature); 
        if (feature.geometry) feature.geometry.dispose();
         if (feature.name.startsWith("forest_bush_") && feature.material && !Array.isArray(feature.material)) {
            (feature.material as THREE.Material).dispose(); 
        }
    });
    mapFeatures.length = 0;
    buildingMeshes.length = 0; // Clear building meshes array
    
    // Clean up terrain meshes
    terrainMeshes.forEach(terrain => {
        if (terrain.parent === scene) scene.remove(terrain);
        terrain.traverse((child: any) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((mat: any) => mat.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
    });
    terrainMeshes.length = 0;
    cachedTerrainMeshes.length = 0;
    generateMapFeatures(); 

    moveForwardActual = false; moveBackwardActual = false; moveLeftActual = false; moveRightActual = false;
    isAimingWithKeyActual = false; isAimingWithMouseActual = false;

    createTargets(); 

    if (controls) {
      const playerObject = controls.getObject();
      let localPlayerSpawnPoint: THREE.Vector3;

      if (gameMode === 'multiplayer') {
          const currentSpawnPoints = getSpawnPointsForCurrentMap();
          // Use random spawn points for both players instead of fixed positions
          localPlayerSpawnPoint = selectRandomSpawnPoint(currentSpawnPoints);
      } else { 
          const currentSpawnPoints = getSpawnPointsForCurrentMap();
          localPlayerSpawnPoint = selectRandomSpawnPoint(currentSpawnPoints); 
      }
      playerObject.position.copy(localPlayerSpawnPoint);
      if (pitchObject) pitchObject.rotation.x = 0;
      playerObject.rotation.y = 0;
    }
    
    equipWeapon('handgun'); 
    isWeaponRecoiling = false; weaponRecoilTime = 0; activeWeaponRecoilOffset.set(0,0,0); cameraPitchRecoil = 0;
    camera.fov = NORMAL_FOV; camera.updateProjectionMatrix();
    if (scopeOverlay) scopeOverlay.style.display = 'none';


    const oldOpponent = scene.getObjectByName("remotePlayer_1");
    if (oldOpponent) {
        scene.remove(oldOpponent); 
        oldOpponent.traverse(child => {
            if (child instanceof THREE.Mesh) {
                if (child.geometry) child.geometry.dispose();
            }
        });
    }
    remotePlayerMesh = null;
    remotePlayerHandgunMesh = null;
    remotePlayerSniperMesh = null;
    remotePlayerSMGMesh = null;

    let shouldResetP2P = true; 
    if (peerConnection && gameMode === 'multiplayer') {
        const pc = peerConnection;
        if (pc.connectionState === 'connecting' || pc.connectionState === 'connected' ||
            pc.iceConnectionState === 'checking' || pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed' ||
            pc.iceGatheringState === 'gathering' ||
            pc.signalingState === 'have-local-offer' || pc.signalingState === 'have-remote-offer' ||
            (pc.signalingState === 'stable' && (pc.connectionState !== 'closed' && pc.connectionState !== 'failed' && pc.connectionState !== 'disconnected'))
            ) {
            shouldResetP2P = false;
        }
    } else if (gameMode !== 'multiplayer' && !peerConnection) {
        shouldResetP2P = false;
    }


    if (gameMode === 'multiplayer') {
        setupMultiplayerSceneElements(); 
        if (shouldResetP2P && (!dataChannel || dataChannel.readyState !== 'open')) resetP2PState();
    } else {
         if (shouldResetP2P) resetP2PState();
    }
    prevTime = performance.now();
}

function createHandgunModel(): {model: THREE.Group, muzzlePoint: THREE.Object3D} {
    const handgunGrp = new THREE.Group();
    const handgunMaterial = new THREE.MeshStandardMaterial({ color: 0x3c3c3c, metalness: 0.7, roughness: 0.35 });
    const bodyGeometry = new THREE.BoxGeometry(0.07, 0.1, 0.22);
    const bodyMesh = new THREE.Mesh(bodyGeometry, handgunMaterial); bodyMesh.castShadow = true; handgunGrp.add(bodyMesh);
    const handleGeometry = new THREE.BoxGeometry(0.06, 0.13, 0.06);
    const handleMesh = new THREE.Mesh(handleGeometry, handgunMaterial); handleMesh.position.set(0, -0.08, 0.03); handleMesh.rotation.x = -0.2; handleMesh.castShadow = true; bodyMesh.add(handleMesh);
    const barrelHeight = 0.13; const barrelRadius = 0.025;
    const barrelGeometry = new THREE.CylinderGeometry(barrelRadius, barrelRadius, barrelHeight, 16);
    const barrelMesh = new THREE.Mesh(barrelGeometry, handgunMaterial); barrelMesh.position.set(0, 0.02, -(bodyGeometry.parameters.depth / 2 - barrelHeight / 2 + 0.005)); barrelMesh.rotation.x = Math.PI / 2; barrelMesh.castShadow = true; bodyMesh.add(barrelMesh);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, barrelHeight / 2, 0); barrelMesh.add(muzzle);
    const frontSightHeight = 0.018; const frontSightGeometry = new THREE.BoxGeometry(0.01, frontSightHeight, 0.01);
    const frontSightMesh = new THREE.Mesh(frontSightGeometry, handgunMaterial); frontSightMesh.position.set(0, barrelRadius + frontSightHeight / 2, -(barrelHeight / 2 - 0.02) ); barrelMesh.add(frontSightMesh);
    const rearSightPostGeometry = new THREE.BoxGeometry(0.007, 0.015, 0.01);
    const rearSightLeftPost = new THREE.Mesh(rearSightPostGeometry, handgunMaterial); rearSightLeftPost.position.set(-0.015 / 2 - 0.007 / 2, bodyGeometry.parameters.height / 2 + 0.015 / 2, bodyGeometry.parameters.depth / 2 - 0.01 / 2 - 0.01); bodyMesh.add(rearSightLeftPost);
    const rearSightRightPost = new THREE.Mesh(rearSightPostGeometry, handgunMaterial); rearSightRightPost.position.set(0.015 / 2 + 0.007 / 2, bodyGeometry.parameters.height / 2 + 0.015 / 2, bodyGeometry.parameters.depth / 2 - 0.01 / 2 - 0.01); bodyMesh.add(rearSightRightPost);
    return {model: handgunGrp, muzzlePoint: muzzle};
}

function createBikeModel(): THREE.Group {
    const bikeGrp = new THREE.Group();
    
    // Use improved fallback model only for now
    createFallbackBikeModel(bikeGrp);
    
    
    return bikeGrp;
}

function recreateBikeModel(): void {
    // Remove existing bike model if it exists
    if (bikeModel) {
        scene.remove(bikeModel);
        bikeModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => mat.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            }
        });
    }
    
    // Create new bike model
    bikeModel = createBikeModel();
    bikeModel.visible = false;
    scene.add(bikeModel);
    
}

function createFallbackBikeModel(bikeGrp: THREE.Group): void {
    
    
    // Materials
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x0066cc, metalness: 0.8, roughness: 0.2 }); // Blue frame
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.8 }); // Dark wheels
    const seatMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 0.6, roughness: 0.3 }); // Red seat
    const handlebarMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.1 }); // Chrome handlebars
    
    // Main frame - motorcycle-like shape (lower)
    const mainFrameGeometry = new THREE.BoxGeometry(0.4, 0.6, 4.0);
    const mainFrame = new THREE.Mesh(mainFrameGeometry, frameMaterial);
    mainFrame.position.set(0, 0.6, 0); // Lower frame
    mainFrame.castShadow = true;
    bikeGrp.add(mainFrame);
    
    // Front wheel (smaller) - swapped to negative Z
    const frontWheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 16);
    const frontWheel = new THREE.Mesh(frontWheelGeometry, wheelMaterial);
    frontWheel.position.set(0, 0.5, -1.8); // Front wheel now at negative Z
    frontWheel.rotation.z = Math.PI / 2;
    frontWheel.castShadow = true;
    bikeGrp.add(frontWheel);
    
    // Back wheel (smaller) - swapped to positive Z
    const backWheel = new THREE.Mesh(frontWheelGeometry, wheelMaterial);
    backWheel.position.set(0, 0.5, 1.8); // Back wheel now at positive Z
    backWheel.rotation.z = Math.PI / 2;
    backWheel.castShadow = true;
    bikeGrp.add(backWheel);
    
    // Engine block (middle, lower)
    const engineGeometry = new THREE.BoxGeometry(0.6, 0.5, 1.2);
    const engineMesh = new THREE.Mesh(engineGeometry, frameMaterial);
    engineMesh.position.set(0, 0.4, 0); // Lower engine
    engineMesh.castShadow = true;
    bikeGrp.add(engineMesh);
    
    // Handlebars (lower) - moved to front (negative Z)
    const handlebarGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 8);
    const handlebarMesh = new THREE.Mesh(handlebarGeometry, handlebarMaterial);
    handlebarMesh.position.set(0, 1.4, -1.4); // Handlebars at front (negative Z)
    handlebarMesh.rotation.z = Math.PI / 2;
    handlebarMesh.castShadow = true;
    bikeGrp.add(handlebarMesh);
    
    // Seat (proper height for 1.8m player) - moved to back (positive Z)
    const seatGeometry = new THREE.BoxGeometry(0.6, 0.1, 1.0);
    const seatMesh = new THREE.Mesh(seatGeometry, seatMaterial);
    seatMesh.position.set(0, 1.0, 0.5); // Seat at back (positive Z)
    seatMesh.castShadow = true;
    bikeGrp.add(seatMesh);
    
    // Front windscreen/fairing (lower) - moved to front (negative Z)
    const windscreenGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.1);
    const windscreenMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0099ff, 
        transparent: true,
        opacity: 0.7,
        metalness: 0.1,
        roughness: 0.1 
    });
    const windscreen = new THREE.Mesh(windscreenGeometry, windscreenMaterial);
    windscreen.position.set(0, 1.2, -1.6); // Windscreen at front (negative Z)
    windscreen.castShadow = true;
    bikeGrp.add(windscreen);
    
    // Bright headlight (front indicator, lower) - moved to front (negative Z)
    const headlightGeometry = new THREE.SphereGeometry(0.2);
    const headlightMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffaa, 
        emissive: 0xffff44,
        emissiveIntensity: 0.8
    });
    const headlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlight.position.set(0, 0.8, -2.1); // Headlight at front (negative Z)
    headlight.castShadow = true;
    bikeGrp.add(headlight);
    
    // Rear light (lower) - moved to back (positive Z)
    const rearLightGeometry = new THREE.SphereGeometry(0.12);
    const rearLightMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000, 
        emissive: 0x440000,
        emissiveIntensity: 0.5
    });
    const rearLight = new THREE.Mesh(rearLightGeometry, rearLightMaterial);
    rearLight.position.set(0, 1.0, 2.0); // Taillight at back (positive Z)
    rearLight.castShadow = true;
    bikeGrp.add(rearLight);
    
    // No rotation needed - bike faces correct direction by default
    
}

function createSniperRifleModel(): {model: THREE.Group, muzzlePoint: THREE.Object3D} {
    const sniperGrp = new THREE.Group();
    const sniperMaterial = new THREE.MeshStandardMaterial({ color: 0x282828, metalness: 0.6, roughness: 0.4 });

    const bodyGeom = new THREE.BoxGeometry(0.08, 0.1, 0.7);
    const bodyMesh = new THREE.Mesh(bodyGeom, sniperMaterial);
    bodyMesh.position.y = 0.03;
    bodyMesh.castShadow = true;
    sniperGrp.add(bodyMesh);

    const barrelLength = 0.6;
    const barrelRadius = 0.02;
    const barrelGeom = new THREE.CylinderGeometry(barrelRadius, barrelRadius, barrelLength, 12);
    const barrelMesh = new THREE.Mesh(barrelGeom, sniperMaterial);
    barrelMesh.rotation.x = Math.PI / 2;
    barrelMesh.position.set(0, 0.01, -(bodyGeom.parameters.depth / 2 + barrelLength / 2 - 0.05));
    barrelMesh.castShadow = true;
    bodyMesh.add(barrelMesh);

    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, barrelLength / 2, 0); 
    barrelMesh.add(muzzle);

    const scopeLength = 0.25;
    const scopeRadius = 0.03;
    const scopeGeom = new THREE.CylinderGeometry(scopeRadius, scopeRadius, scopeLength, 12);
    const scopeMesh = new THREE.Mesh(scopeGeom, sniperMaterial);
    scopeMesh.name = "sniperScopeMesh"; 
    scopeMesh.rotation.x = Math.PI / 2;
    scopeMesh.position.set(0, bodyGeom.parameters.height / 2 + scopeRadius -0.01, -0.1); 
    scopeMesh.castShadow = true;
    bodyMesh.add(scopeMesh);

    const stockGeom = new THREE.BoxGeometry(0.07, 0.08, 0.25);
    const stockMesh = new THREE.Mesh(stockGeom, sniperMaterial);
    stockMesh.position.set(0, -0.02, bodyGeom.parameters.depth / 2 + 0.05);
    stockMesh.rotation.x = 0.3;
    stockMesh.castShadow = true;
    bodyMesh.add(stockMesh);

    return {model: sniperGrp, muzzlePoint: muzzle};
}

function createSMGModel(): { model: THREE.Group, muzzlePoint: THREE.Object3D } {
    const smgGrp = new THREE.Group();
    const smgMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.65, roughness: 0.4 });

    // Main Body
    const bodyGeom = new THREE.BoxGeometry(0.07, 0.09, 0.35);
    const bodyMesh = new THREE.Mesh(bodyGeom, smgMaterial);
    bodyMesh.position.y = 0.01;
    bodyMesh.castShadow = true;
    smgGrp.add(bodyMesh);

    // Barrel
    const barrelLength = 0.15;
    const barrelRadius = 0.02;
    const barrelGeom = new THREE.CylinderGeometry(barrelRadius, barrelRadius * 0.9, barrelLength, 10);
    const barrelMesh = new THREE.Mesh(barrelGeom, smgMaterial);
    barrelMesh.rotation.x = Math.PI / 2;
    barrelMesh.position.set(0, 0.005, -(bodyGeom.parameters.depth / 2 + barrelLength / 2 - 0.02));
    barrelMesh.castShadow = true;
    bodyMesh.add(barrelMesh);

    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, barrelLength / 2, 0);
    barrelMesh.add(muzzle);

    // Magazine
    const magGeom = new THREE.BoxGeometry(0.035, 0.12, 0.07);
    const magazineMesh = new THREE.Mesh(magGeom, smgMaterial);
    magazineMesh.position.set(0, -0.06, -0.05);
    magazineMesh.rotation.x = 0.15; // Slight forward angle
    magazineMesh.castShadow = true;
    bodyMesh.add(magazineMesh);

    // Simple stock/handle part
    const stockGeom = new THREE.BoxGeometry(0.05, 0.07, 0.1);
    const stockMesh = new THREE.Mesh(stockGeom, smgMaterial);
    stockMesh.position.set(0, -0.03, bodyGeom.parameters.depth / 2 - 0.03);
    stockMesh.castShadow = true;
    bodyMesh.add(stockMesh);
    
    // Top rail / sight base (optional visual detail)
    const railGeom = new THREE.BoxGeometry(0.02, 0.015, 0.15);
    const railMesh = new THREE.Mesh(railGeom, smgMaterial);
    railMesh.position.set(0, bodyGeom.parameters.height/2 + 0.0075, -0.05);
    bodyMesh.add(railMesh);

    return { model: smgGrp, muzzlePoint: muzzle };
}


function populateWeaponStatsDB() {
    weaponStatsDB = {
        handgun: {
            hipPosition: new THREE.Vector3(0.2, -0.20, -0.4),
            adsPosition: new THREE.Vector3(0, -0.065, -0.38),
            hipRotation: new THREE.Euler(0, -Math.PI / 45, 0),
            adsRotation: new THREE.Euler(0, 0, 0),
            adsFov: 50,
            recoilAmount: new THREE.Vector3(0.01, 0.025, 0.06), 
            recoilDuration: 0.05,
            recoilReturnSpeed: 18,
            fireRate: 200, 
            projectileSpeed: 250.0,
            projectileMaterial: handgunProjectileMaterial,
            model: handgunModel,
            muzzlePoint: handgunMuzzlePoint,
            damage: 25, // Adjusted for 100 HP system (4 shots to kill)
            magazineCapacity: 15,
            reloadTime: 500,
            ballisticCoefficient: 0.15, // Pistol bullet BC
            airDensity: 1.225,
        },
        sniper: {
            hipPosition: new THREE.Vector3(0.3, -0.22, -0.6), 
            adsPosition: new THREE.Vector3(0, -0.11, -0.4), 
            hipRotation: new THREE.Euler(0, -Math.PI / 60, 0),
            adsRotation: new THREE.Euler(0, 0, 0), 
            adsFov: 20,
            recoilAmount: new THREE.Vector3(0.005, 0.07, 0.15), 
            recoilDuration: 0.15,
            recoilReturnSpeed: 12, 
            fireRate: 500, 
            projectileSpeed: 850.0,
            projectileMaterial: sniperProjectileMaterial,
            model: sniperRifleModel,
            muzzlePoint: sniperMuzzlePoint,
            damage: 105, 
            magazineCapacity: 5,
            reloadTime: 1500,
            zeroingDistance: 100, // Default 100m zeroing
            ballisticCoefficient: 0.5, // High BC for long-range accuracy
            airDensity: 1.225, 
        },
        smg: {
            hipPosition: new THREE.Vector3(0.25, -0.18, -0.45),
            adsPosition: new THREE.Vector3(0.01, -0.075, -0.39), // Slightly offset for iron sights feel
            hipRotation: new THREE.Euler(0, -Math.PI / 50, 0),
            adsRotation: new THREE.Euler(0, 0, 0),
            adsFov: 60,
            recoilAmount: new THREE.Vector3(0.025, 0.035, 0.04), // x:sideways, y:model_vertical, z:model_backward
            recoilDuration: 0.06, // quick per shot
            recoilReturnSpeed: 16,
            fireRate: 100, // Fast
            projectileSpeed: 300.0,
            projectileMaterial: smgProjectileMaterial,
            model: smgModel,
            muzzlePoint: smgMuzzlePoint,
            damage: 20, // Adjusted for 100 HP system (5 shots to kill)
            spreadAngle: THREE.MathUtils.degToRad(7.0), // ~7 degree cone for hip fire
            adsSpreadMultiplier: 0.45, // 45% of hip fire spread when ADS
            magazineCapacity: 30,
            reloadTime: 1000,
            ballisticCoefficient: 0.18, // SMG bullet BC
            airDensity: 1.225,
        }
    };
    
    // Initialize ammo for all weapons
    currentAmmo = {
        'handgun': weaponStatsDB.handgun.magazineCapacity || 15,
        'sniper': weaponStatsDB.sniper.magazineCapacity || 5,
        'smg': weaponStatsDB.smg.magazineCapacity || 30
    };
}


function equipWeapon(weaponType: 'handgun' | 'sniper' | 'smg') {
    if (!weaponStatsDB[weaponType] || !weaponStatsDB[weaponType].model) {
        console.error(`Weapon type ${weaponType} or its model is not initialized.`);
        return;
    }
    
    // Bike weapon restriction: only allow weapons in bikeCanUseWeapons array while on bike
    if (isOnBike && !bikeCanUseWeapons.includes(weaponType)) {
        showTemporaryMessage(`Cannot use ${weaponType} while on bike! Only ${bikeCanUseWeapons.join(', ')} allowed.`, 500);
        return;
    }
    
    if (isFiringSMGActual && currentEquippedWeapon === 'smg' && weaponType !== 'smg') {
        isFiringSMGActual = false; // Stop auto-fire if switching from SMG while firing
    }
    currentEquippedWeapon = weaponType;


    const newWeaponStats = weaponStatsDB[currentEquippedWeapon];

    handgunModel.visible = (weaponType === 'handgun');
    sniperRifleModel.visible = (weaponType === 'sniper');
    smgModel.visible = (weaponType === 'smg');
    
    const sniperScope = sniperRifleModel.getObjectByName("sniperScopeMesh");
    if (sniperScope) {
        sniperScope.visible = true; 
    }

    isAimingWithKeyActual = false;
    isAimingWithMouseActual = false;

    if (newWeaponStats.model && newWeaponStats.hipPosition && newWeaponStats.hipRotation) {
        newWeaponStats.model.position.copy(newWeaponStats.hipPosition);
        newWeaponStats.model.rotation.copy(newWeaponStats.hipRotation);
    }
    
    isWeaponRecoiling = false;
    weaponRecoilTime = 0;
    activeWeaponRecoilOffset.set(0,0,0);
    cameraPitchRecoil = 0;
    
    // Initialize ammo if not already set
    if (Object.keys(currentAmmo).length === 0) {
        currentAmmo = {
            'handgun': weaponStatsDB.handgun.magazineCapacity || 15,
            'sniper': weaponStatsDB.sniper.magazineCapacity || 5,
            'smg': weaponStatsDB.smg.magazineCapacity || 30
        };
    } 

    if (scopeOverlay) {
        scopeOverlay.style.display = 'none'; 
    }
    
    // Show/hide zeroing display based on weapon type
    const zeroingDisplay = document.getElementById('zeroing-display');
    if (zeroingDisplay) {
        if (weaponType === 'sniper') {
            zeroingDisplay.style.display = 'block';
            updateZeroingDisplay();
        } else {
            zeroingDisplay.style.display = 'none';
        }
    }
    
    // Show/hide zoom display and update it based on weapon type
    const zoomDisplay = document.getElementById('zoom-display');
    if (zoomDisplay) {
        if (weaponType === 'sniper') {
            currentScopeZoomIndex = 0; // Reset to 2x zoom when equipping sniper
            zoomDisplay.style.display = 'block';
            updateZoomDisplay();
        } else {
            zoomDisplay.style.display = 'none';
        }
    }
}


function updateZeroingDisplay() {
    const secondZeroElement = document.getElementById('second-zero');
    const firstZeroElement = document.getElementById('first-zero');
    
    if (secondZeroElement && firstZeroElement && currentEquippedWeapon === 'sniper') {
        const weaponStats = weaponStatsDB.sniper;
        if (weaponStats && weaponStats.projectileSpeed) {
            const firstZeroDistance = calculateFirstZeroDistance(sniperZeroingDistance, weaponStats.projectileSpeed);
            
            secondZeroElement.textContent = `${sniperZeroingDistance}m (2nd)`;
            firstZeroElement.textContent = `${Math.round(firstZeroDistance)}m (1st)`;
        }
    }
}

function updateAmmoDisplay() {
    const ammoText = document.getElementById('ammo-text');
    const reloadProgressContainer = document.getElementById('reload-progress-container');
    const reloadProgressBar = document.getElementById('reload-progress-bar');
    
    if (!ammoText || !reloadProgressContainer || !reloadProgressBar) return;
    
    if (isReloading) {
        // Hide ammo text, show progress bar
        ammoText.style.display = 'none';
        reloadProgressContainer.style.display = 'block';
        
        // Calculate reload progress
        const currentWeaponStats = weaponStatsDB[currentEquippedWeapon];
        if (currentWeaponStats && currentWeaponStats.reloadTime) {
            const elapsed = performance.now() - reloadStartTime;
            const progress = Math.min(elapsed / currentWeaponStats.reloadTime, 1.0);
            const progressPercent = Math.round(progress * 100);
            
            // Update progress bar width
            reloadProgressBar.style.setProperty('--progress', `${progressPercent}%`);
        }
    } else {
        // Show ammo text, hide progress bar
        ammoText.style.display = 'block';
        reloadProgressContainer.style.display = 'none';
        
        const currentWeaponStats = weaponStatsDB[currentEquippedWeapon];
        const currentAmmoCount = currentAmmo[currentEquippedWeapon] || 0;
        const maxAmmo = currentWeaponStats?.magazineCapacity || 0;
        
        ammoText.textContent = `${currentAmmoCount}/${maxAmmo}`;
    }
}

function calculateFirstZeroDistance(secondZeroDistance: number, velocity: number): number {
    // Calculate the first zero (close range intersection)
    // Using ballistic trajectory mathematics
    const g = GRAVITY;
    const v = velocity;
    const d2 = secondZeroDistance;
    
    // Simplified calculation for first zero distance
    // First zero is typically much closer than second zero
    const timeToSecondZero = d2 / v;
    const maxHeight = (g * timeToSecondZero * timeToSecondZero) / 8;
    const firstZeroDistance = d2 * 0.1; // Approximation: ~10% of second zero distance
    
    return Math.max(5, firstZeroDistance); // Minimum 5m for realism
}

function calculateZeroingAngle(distance: number, velocity: number): number {
    // Calculate the angle needed to hit a target at given distance (SECOND ZERO)
    // Using improved ballistics formula for second zero intersection
    const g = GRAVITY;
    const v = velocity;
    const d = distance;
    
    // Calculate launch angle for second zero intersection
    // Formula: angle = 0.5 * arcsin(g * d / v^2)
    const sinValue = (g * d) / (v * v);
    
    // Ensure sinValue is within valid range [-1, 1]
    if (sinValue > 1) {
        console.warn(`Zeroing distance ${d}m is too far for velocity ${v}m/s`);
        return Math.atan((g * d) / (v * v)); // Fallback to first zero calculation
    }
    
    // Second zero calculation (higher trajectory)
    const angle = 0.5 * Math.asin(sinValue);
    return angle;
}

function adjustZeroing(adjustment: number) {
    if (currentEquippedWeapon === 'sniper') {
        sniperZeroingDistance = Math.max(50, Math.min(300, sniperZeroingDistance + adjustment));
        
        // Update zeroing display
        updateZeroingDisplay();
        
        // Show temporary message with new zeroing distance
        showTemporaryMessage(`Zeroing: ${sniperZeroingDistance}m`);
    }
}

function toggleBike() {
    if (!controls || !controls.isLocked || isGameOver) {
        return;
    }
    
    isOnBike = !isOnBike;
    
    if (isOnBike) {
        // Initialize bike position to current player position
        const playerObject = controls.getObject();
        bikePosition.copy(playerObject.position);
        bikeDirection = playerObject.rotation.y; // Store initial direction for A/D turning
        bikeSpeed = 0;
        
        // Create new bike model if it doesn't exist or recreate if outdated
        if (!bikeModel) {
            recreateBikeModel();
        }
        
        // Show bike model
        if (bikeModel) {
            bikeModel.visible = true;
            bikeModel.position.copy(bikePosition);
            bikeModel.position.y += 0.5; // Raise bike by wheel radius to sit on ground properly
            bikeModel.rotation.y = bikeDirection;
        }
        
        // Force switch to handgun when getting on bike
        if (currentEquippedWeapon !== 'handgun') {
            equipWeapon('handgun');
        }
        
        showTemporaryMessage("Bike ON - W/S: Accelerate/Brake, A/D: Turn", 500);
    } else {
        // Hide bike model
        if (bikeModel) {
            bikeModel.visible = false;
        }
        
        
        // Reset bike state when getting off
        bikeSpeed = 0;
        bikeAccelerateActual = false;
        bikeDecelerateActual = false;
        bikeTurnLeftActual = false;
        bikeTurnRightActual = false;
        
        // Reset banking
        bikeBankAngle = 0;
        targetBankAngle = 0;
        
        // Reset camera banking (remove roll)
        if (controls) {
            const cameraObject = controls.getObject();
            cameraObject.rotation.order = 'YXZ';
            cameraObject.rotation.z = 0; // Remove banking
        }
        
        showTemporaryMessage("Bike OFF", 500);
    }
}

function startReload() {
    if (isReloading || isGameOver) return;
    
    const currentWeaponStats = weaponStatsDB[currentEquippedWeapon];
    if (!currentWeaponStats || !currentWeaponStats.magazineCapacity || !currentWeaponStats.reloadTime) return;
    
    // Check if reload is needed
    if (currentAmmo[currentEquippedWeapon] >= currentWeaponStats.magazineCapacity) return;
    
    isReloading = true;
    reloadStartTime = performance.now();
    
    // Stop SMG auto-fire during reload
    if (currentEquippedWeapon === 'smg') {
        isFiringSMGActual = false;
    }
}

function initThreeJSGame() {
  if (isGameInitialized) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); 
  scene.fog = new THREE.Fog(0x87ceeb, 0, 250); 
  camera = new THREE.PerspectiveCamera(NORMAL_FOV, window.innerWidth / window.innerHeight, 0.1, 1000);

  if (!gameContainer) { console.error("Game container not found for renderer!"); return; }
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  gameContainer.appendChild(renderer.domElement);

  controls = new PointerLockControls(camera, renderer.domElement);
  controls.sensitivity = 0.002 * mouseSensitivity;
  
  // Store original mouse move function for sensitivity modification
  const originalOnMouseMove = (controls as any).onMouseMove;
  (controls as any).onMouseMove = function(event: MouseEvent) {
    if (this.isLocked === false) return;
    
    const sensitivity = getMouseSensitivityMultiplier();
    
    // Create modified event with adjusted movement
    const modifiedEvent = {
      ...event,
      movementX: event.movementX * sensitivity,
      movementY: event.movementY * sensitivity
    };
    
    originalOnMouseMove.call(this, modifiedEvent);
  };
  
  // Wait for next frame to ensure PointerLockControls internal structure is ready
  setTimeout(() => {
    pitchObject = camera.parent as THREE.Object3D;

    if (!(pitchObject && pitchObject instanceof THREE.Object3D && pitchObject.parent === controls.getObject())) {
      console.warn("Primary method for pitchObject (camera.parent) failed or structure unexpected. Trying fallback.");
      const yawObjectFallback = controls.getObject();
      if (yawObjectFallback && yawObjectFallback.children && yawObjectFallback.children.length > 0 && yawObjectFallback.children[0] instanceof THREE.Object3D) {
          pitchObject = yawObjectFallback.children[0] as THREE.Object3D;
      } else {
          // Create a fallback pitch object as last resort
          pitchObject = new THREE.Object3D();
          pitchObject.add(camera);
          controls.getObject().add(pitchObject);
      }
    }
    
    if (pitchObject) {
    }
  }, 0);


  if (instructionOverlay) {
    instructionOverlay.addEventListener('click', () => {
      if (isGameOver) return; 
      if (gameMode === 'multiplayer' && (!dataChannel || dataChannel.readyState !== 'open')) {
        alert("Please connect to a peer first using the P2P controls."); return;
      }
      controls.lock();
    });
    controls.addEventListener('lock', () => {
      if (isGameOver) return;
      instructionOverlay.style.display = 'none';
      if (gameMode === 'multiplayer' && signalingPanel) signalingPanel.style.display = 'none';
      
      // Show ammo counter when gameplay starts
      const ammoCounter = document.getElementById('ammo-counter');
      if (ammoCounter) {
        ammoCounter.style.display = 'block';
        updateAmmoDisplay();
      }
      
      prevTime = performance.now(); pendingInputs.length = 0;
      isFiringSMGActual = false; // Ensure SMG is not firing when locking controls initially
    });
    controls.addEventListener('unlock', () => {
      if (isGameOver) return;
      instructionOverlay.style.display = 'flex';
      
      // Hide ammo counter when returning to menu
      const ammoCounter = document.getElementById('ammo-counter');
      if (ammoCounter) {
        ammoCounter.style.display = 'none';
      }
      if (gameMode === 'multiplayer' && signalingPanel && (!dataChannel || dataChannel.readyState !== 'open')) {
           signalingPanel.style.display = 'block';
      }
      moveForwardActual = false; moveBackwardActual = false; moveLeftActual = false; moveRightActual = false;
      isAimingWithKeyActual = false; isAimingWithMouseActual = false;
      isFiringSMGActual = false; // Stop firing SMG if controls are unlocked
      if (mainMenuDiv && gameMode !== 'idle') {
          mainMenuDiv.style.display = 'none';
      } else if (mainMenuDiv) {
          mainMenuDiv.style.display = 'flex';
          gameMode = 'idle';
          if (peerConnection) resetP2PState(); 
      }
    });
  }
  scene.add(controls.getObject()); 

  const hg = createHandgunModel();
  handgunModel = hg.model;
  handgunMuzzlePoint = hg.muzzlePoint;
  camera.add(handgunModel); 

  const sr = createSniperRifleModel();
  sniperRifleModel = sr.model;
  sniperMuzzlePoint = sr.muzzlePoint;
  camera.add(sniperRifleModel); 

  const smgData = createSMGModel();
  smgModel = smgData.model;
  smgMuzzlePoint = smgData.muzzlePoint;
  camera.add(smgModel);
  
  // Create bike model (initially hidden)
  recreateBikeModel();
  
  populateWeaponStatsDB(); 
  equipWeapon('handgun'); 


  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(25, 40, 30); directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 4096; directionalLight.shadow.mapSize.height = 4096;
  directionalLight.shadow.camera.near = 0.5; directionalLight.shadow.camera.far = 150;
  directionalLight.shadow.camera.left = -60; directionalLight.shadow.camera.right = 60;
  directionalLight.shadow.camera.top = 60; directionalLight.shadow.camera.bottom = -60;
  scene.add(directionalLight);

  // Ground will be created in resetGameScene() based on map type
  createGroundMesh();
  
  document.addEventListener('keydown', onKeyDown); document.addEventListener('keyup', onKeyUp);
  document.addEventListener('mousedown', onMouseDown); document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('contextmenu', (event) => event.preventDefault());
  window.addEventListener('resize', onWindowResize);

  isGameInitialized = true;
  animate();
}

function generateArenaMap() {
    if (!prng) { console.error("ArenaMap: PRNG not initialized!"); return; }
    const featurePlacementBounds = getMapBounds();
    const multiplier = getObjectCountMultiplier();
    const numObstacles = prng.nextInt(Math.floor(15 * multiplier), Math.floor(24 * multiplier));
    for (let i = 0; i < numObstacles; i++) {
        const sizeX = prng.randFloat(2, 10);
        const sizeY = prng.randFloat(1, 6);
        const sizeZ = prng.randFloat(2, 10);
        const boxGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
        const obstacle = new THREE.Mesh(boxGeometry, arenaMapFeatureMaterial);
        obstacle.position.x = prng.randFloat(featurePlacementBounds.minX, featurePlacementBounds.maxX);
        obstacle.position.y = sizeY / 2;
        obstacle.position.z = prng.randFloat(featurePlacementBounds.minZ, featurePlacementBounds.maxZ);
        obstacle.rotation.y = prng.next() * Math.PI * 2;
        obstacle.castShadow = true;
        obstacle.receiveShadow = true;
        obstacle.name = `arena_obstacle_${i}`;
        scene.add(obstacle);
        mapFeatures.push(obstacle);
        buildingMeshes.push(obstacle); // Add to building meshes for collision detection
    }

    const numRamps = prng.nextInt(2, 3);
    for (let i = 0; i < numRamps; i++) {
        const rampWidth = prng.randFloat(3, 5);
        const rampHeight = prng.randFloat(1.5, 3);
        const rampLength = prng.randFloat(8, 15);
        const rampGeometry = new THREE.BoxGeometry(rampWidth, rampHeight, rampLength);
        const ramp = new THREE.Mesh(rampGeometry, arenaMapFeatureMaterial);
        ramp.position.x = prng.randFloat(featurePlacementBounds.minX / 2, featurePlacementBounds.maxX / 2);
        ramp.position.z = prng.randFloat(featurePlacementBounds.minZ / 2, featurePlacementBounds.maxZ / 2);
        ramp.position.y = rampHeight / 2;

        const yRotation = prng.next() * Math.PI * 2;
        const rampWrapper = new THREE.Object3D();
        rampWrapper.position.copy(ramp.position);
        rampWrapper.rotation.y = yRotation;
        ramp.position.set(0,0,0);
        rampWrapper.add(ramp);
        rampWrapper.name = `arena_ramp_wrapper_${i}`;

        const angle = Math.atan2(rampHeight, rampLength);
        ramp.geometry.computeBoundingBox();
        const rampCenterToEdge = ramp.geometry.boundingBox!.max.z;
        ramp.position.y = rampCenterToEdge * Math.sin(angle/2) + rampHeight *0.1;
        ramp.rotation.x = -angle * 0.8;

        ramp.castShadow = true;
        ramp.receiveShadow = true;
        ramp.name = `arena_ramp_${i}`;
        scene.add(rampWrapper);
        mapFeatures.push(ramp);
        buildingMeshes.push(ramp); // Add to building meshes for collision detection 
    }
}

function generateUrbanMap() {
    if (!prng) { console.error("UrbanMap: PRNG not initialized!"); return; }
    const cityBounds = getMapBounds();
    const multiplier = getObjectCountMultiplier();
    const numBuildings = prng.nextInt(Math.floor(20 * multiplier), Math.floor(35 * multiplier));
    const minBuildingDim = 8, maxBuildingDim = 25;
    const minBuildingHeight = 10, maxBuildingHeight = 40;

    for (let i = 0; i < numBuildings; i++) {
        const sizeX = prng.randFloat(minBuildingDim, maxBuildingDim);
        const sizeY = prng.randFloat(minBuildingHeight, maxBuildingHeight);
        const sizeZ = prng.randFloat(minBuildingDim, maxBuildingDim);
        const buildingGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
        const building = new THREE.Mesh(buildingGeometry, urbanBuildingMaterial);

        building.position.x = prng.randFloat(cityBounds.minX + sizeX / 2, cityBounds.maxX - sizeX / 2);
        building.position.y = sizeY / 2;
        building.position.z = prng.randFloat(cityBounds.minZ + sizeZ / 2, cityBounds.maxZ - sizeZ / 2);
        
        let tooClose = false;
        const buildingBox = new THREE.Box3().setFromObject(building);
        for(const existingFeature of mapFeatures){
            const existingBox = new THREE.Box3().setFromObject(existingFeature);
            if(buildingBox.intersectsBox(existingBox)){
                const intersection = buildingBox.clone().intersect(existingBox);
                const intersectionSize = new THREE.Vector3();
                intersection.getSize(intersectionSize);
                if (intersectionSize.x > 1 && intersectionSize.y > 1 && intersectionSize.z > 1) { 
                    tooClose = true;
                    break;
                }
            }
        }

        if(tooClose && prng.next() < 0.7){ 
             if (building.geometry) building.geometry.dispose(); 
            continue;
        }

        building.castShadow = true;
        building.receiveShadow = true;
        building.name = `urban_building_${i}`;
        scene.add(building);
        mapFeatures.push(building);
        buildingMeshes.push(building); // Add to building meshes for collision detection
    }

    const numStreetObstacles = prng.nextInt(10, 18);
    for (let i = 0; i < numStreetObstacles; i++) {
        const type = prng.next();
        let obsSizeX, obsSizeY, obsSizeZ;
        if (type < 0.6) { 
            obsSizeX = prng.randFloat(1.8, 2.5);
            obsSizeY = prng.randFloat(1.2, 1.8);
            obsSizeZ = prng.randFloat(3.5, 5.0);
        } else { 
            obsSizeX = prng.randFloat(3, 6);
            obsSizeY = prng.randFloat(0.8, 1.5);
            obsSizeZ = prng.randFloat(0.5, 1.0);
        }
        const obstacleGeometry = new THREE.BoxGeometry(obsSizeX, obsSizeY, obsSizeZ);
        const obstacle = new THREE.Mesh(obstacleGeometry, urbanObstacleMaterial);

        obstacle.position.x = prng.randFloat(cityBounds.minX, cityBounds.maxX);
        obstacle.position.y = obsSizeY / 2;
        obstacle.position.z = prng.randFloat(cityBounds.minZ, cityBounds.maxZ);
        obstacle.rotation.y = prng.next() * Math.PI * 0.5; 

        let placedInsideBuilding = false;
        const obstacleBox = new THREE.Box3().setFromObject(obstacle);
        for (const feature of mapFeatures) { 
            if(feature.name.startsWith("urban_building_")){
                const featureBox = new THREE.Box3().setFromObject(feature);
                if (obstacleBox.intersectsBox(featureBox)) {
                    placedInsideBuilding = true;
                    break;
                }
            }
        }
        if (placedInsideBuilding) {
             if (obstacle.geometry) obstacle.geometry.dispose();
            continue;
        }

        obstacle.castShadow = true;
        obstacle.receiveShadow = true;
        obstacle.name = `urban_obstacle_${i}`;
        scene.add(obstacle);
        mapFeatures.push(obstacle);
        buildingMeshes.push(obstacle); // Add to building meshes for collision detection
    }
}

function generateForestMap() {
    if (!prng) { console.error("ForestMap: PRNG not initialized!"); return; }
    const forestBounds = getMapBounds();
    const multiplier = getObjectCountMultiplier();
    const numTrees = prng.nextInt(Math.floor(35 * multiplier), Math.floor(50 * multiplier)); 

    for (let i = 0; i < numTrees; i++) {
        const treeGroup = new THREE.Group();
        treeGroup.name = `forest_tree_group_${i}`; 

        const trunkHeight = prng.randFloat(3, 10);
        const trunkRadius = prng.randFloat(0.3, 0.8);
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius * 0.8, trunkHeight, 12);
        const trunkMesh = new THREE.Mesh(trunkGeometry, forestTreeTrunkMaterial);
        trunkMesh.castShadow = true;
        trunkMesh.receiveShadow = true;
        trunkMesh.position.y = trunkHeight / 2;
        trunkMesh.name = `forest_trunk_${i}`;
        treeGroup.add(trunkMesh);

        const foliageType = prng.next();
        let foliageMesh: THREE.Mesh;
        if (foliageType < 0.6) { 
            const foliageHeight = prng.randFloat(trunkHeight * 0.6, trunkHeight * 1.2);
            const foliageRadius = prng.randFloat(trunkRadius * 3, trunkRadius * 5);
            const foliageGeometry = new THREE.ConeGeometry(foliageRadius, foliageHeight, 16);
            foliageMesh = new THREE.Mesh(foliageGeometry, forestFoliageMaterial);
            foliageMesh.position.y = trunkHeight + foliageHeight * 0.4; 
        } else { 
            const foliageRadius = prng.randFloat(trunkRadius * 2.5, trunkRadius * 4);
            const foliageSegments = prng.next() < 0.5 ? 8 : 12; 
            const foliageGeometry = new THREE.SphereGeometry(foliageRadius, foliageSegments, foliageSegments / 2);
            foliageMesh = new THREE.Mesh(foliageGeometry, forestFoliageMaterial);
            foliageMesh.position.y = trunkHeight + foliageRadius * 0.6; 
        }
        foliageMesh.castShadow = true;
        foliageMesh.name = `forest_foliage_${i}`;
        treeGroup.add(foliageMesh);
        
        mapFeatures.push(trunkMesh); 
        mapFeatures.push(foliageMesh);
        buildingMeshes.push(trunkMesh); // Add tree trunk to building meshes for collision detection 

        treeGroup.position.x = prng.randFloat(forestBounds.minX, forestBounds.maxX);
        treeGroup.position.z = prng.randFloat(forestBounds.minZ, forestBounds.maxZ);
        treeGroup.position.y = 0; 

        let tooClose = false;
        for (const existingFeature of mapFeatures) {
             if (existingFeature.parent === treeGroup || !existingFeature.parent) continue; 
             if(existingFeature.parent && existingFeature.parent !== scene && existingFeature.parent.name.startsWith("forest_tree_group")) {
                const dist = treeGroup.position.distanceTo(existingFeature.parent.position);
                if (dist < trunkRadius * 2 + 2) { 
                    tooClose = true;
                    break;
                }
             }
        }
        if (tooClose && prng.next() < 0.6) { 
            trunkMesh.geometry.dispose();
            foliageMesh.geometry.dispose();
            mapFeatures.pop(); mapFeatures.pop(); 
            scene.remove(treeGroup); // Remove the group if not adding its children
            continue;
        }
        
        scene.add(treeGroup);
    }

    const numRocks = prng.nextInt(15, 25);
    for (let i = 0; i < numRocks; i++) {
        const rockSizeX = prng.randFloat(0.5, 3);
        const rockSizeY = prng.randFloat(0.5, 2.5);
        const rockSizeZ = prng.randFloat(0.5, 3);
        const rockGeometry = new THREE.BoxGeometry(rockSizeX, rockSizeY, rockSizeZ); 
        const rock = new THREE.Mesh(rockGeometry, forestRockMaterial);
        rock.position.x = prng.randFloat(forestBounds.minX, forestBounds.maxX);
        rock.position.y = rockSizeY / 2;
        rock.position.z = prng.randFloat(forestBounds.minZ, forestBounds.maxZ);
        rock.rotation.y = prng.next() * Math.PI;
        rock.rotation.x = (prng.next() - 0.5) * 0.3;
        rock.rotation.z = (prng.next() - 0.5) * 0.3;
        rock.castShadow = true;
        rock.receiveShadow = true;
        rock.name = `forest_rock_${i}`;
        scene.add(rock);
        mapFeatures.push(rock);
        buildingMeshes.push(rock); // Add to building meshes for collision detection
    }

    const numBushes = prng.nextInt(8, 15);
    for (let i = 0; i < numBushes; i++) {
        const bushRadius = prng.randFloat(0.8, 2.0);
        const bushDetail = prng.next() < 0.5 ? 6 : 8;
        const bushGeometry = new THREE.SphereGeometry(bushRadius, bushDetail, bushDetail / 2);
        const baseBushColorHex = Number(forestFoliageMaterial.color.getHex());
        const colorVariation = prng.nextInt(0, 0x001100); 
        const bushMaterial = new THREE.MeshStandardMaterial({ color: (baseBushColorHex * 0.8 + colorVariation), roughness: 0.9, metalness: 0.0 });
        const bush = new THREE.Mesh(bushGeometry, bushMaterial);
        bush.position.x = prng.randFloat(forestBounds.minX, forestBounds.maxX);
        bush.position.y = bushRadius * 0.6; 
        bush.position.z = prng.randFloat(forestBounds.minZ, forestBounds.maxZ);
        bush.castShadow = true;
        bush.name = `forest_bush_${i}`;
        scene.add(bush);
        mapFeatures.push(bush);
    }
}

function generatePlainsMap() {
    if (!prng) { console.error("PlainsMap: PRNG not initialized!"); return; }
    
    const plainsBounds = getMapBounds();
    const multiplier = getObjectCountMultiplier();
    
    // Create rolling hills using elevation points
    const numHills = prng.nextInt(Math.floor(8 * multiplier), Math.floor(15 * multiplier));
    for (let i = 0; i < numHills; i++) {
        const hillRadius = prng.randFloat(15, 40);
        const hillHeight = prng.randFloat(3, 12);
        const hillGeometry = new THREE.SphereGeometry(hillRadius, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
        const hill = new THREE.Mesh(hillGeometry, plainsGrassMaterial);
        
        hill.position.x = prng.randFloat(plainsBounds.minX + hillRadius, plainsBounds.maxX - hillRadius);
        hill.position.y = 0;
        hill.position.z = prng.randFloat(plainsBounds.minZ + hillRadius, plainsBounds.maxZ - hillRadius);
        hill.scale.y = hillHeight / hillRadius;
        
        hill.castShadow = true;
        hill.receiveShadow = true;
        hill.name = `plains_hill_${i}`;
        scene.add(hill);
        mapFeatures.push(hill);
    }
    
    // Sparse rock formations for cover
    const numRockFormations = prng.nextInt(Math.floor(12 * multiplier), Math.floor(20 * multiplier));
    for (let i = 0; i < numRockFormations; i++) {
        const rockGroup = new THREE.Group();
        rockGroup.name = `plains_rocks_${i}`;
        
        const numRocksInFormation = prng.nextInt(2, 6);
        for (let j = 0; j < numRocksInFormation; j++) {
            const rockSize = prng.randFloat(1.5, 4.5);
            const rockHeight = prng.randFloat(rockSize * 0.8, rockSize * 2.0);
            const rockGeometry = new THREE.BoxGeometry(rockSize, rockHeight, rockSize * prng.randFloat(0.7, 1.3));
            const rock = new THREE.Mesh(rockGeometry, plainsRockMaterial);
            
            rock.position.x = prng.randFloat(-6, 6);
            rock.position.y = rockHeight / 2;
            rock.position.z = prng.randFloat(-6, 6);
            rock.rotation.y = prng.randFloat(0, Math.PI * 2);
            
            rock.castShadow = true;
            rock.receiveShadow = true;
            rock.name = `plains_rock_${i}_${j}`;
            rockGroup.add(rock);
        }
        
        rockGroup.position.x = prng.randFloat(plainsBounds.minX, plainsBounds.maxX);
        rockGroup.position.z = prng.randFloat(plainsBounds.minZ, plainsBounds.maxZ);
        
        scene.add(rockGroup);
        mapFeatures.push(rockGroup);
        buildingMeshes.push(rockGroup); // Add to building meshes for collision detection
    }
    
    // Scattered individual trees for long-range reference points
    const numTrees = prng.nextInt(8, 15);
    for (let i = 0; i < numTrees; i++) {
        const treeGroup = new THREE.Group();
        treeGroup.name = `plains_tree_${i}`;
        
        const trunkHeight = prng.randFloat(8, 16);
        const trunkRadius = prng.randFloat(0.4, 1.0);
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius * 0.9, trunkHeight, 12);
        const trunk = new THREE.Mesh(trunkGeometry, plainsTreeMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        treeGroup.add(trunk);
        
        // Large canopy for long-distance visibility
        const canopyRadius = prng.randFloat(trunkRadius * 4, trunkRadius * 7);
        const canopyGeometry = new THREE.SphereGeometry(canopyRadius, 12, 8);
        const canopy = new THREE.Mesh(canopyGeometry, plainsGrassMaterial);
        canopy.position.y = trunkHeight + canopyRadius * 0.5;
        canopy.scale.y = 0.6; // Flatten slightly
        canopy.castShadow = true;
        canopy.receiveShadow = true;
        treeGroup.add(canopy);
        
        treeGroup.position.x = prng.randFloat(plainsBounds.minX, plainsBounds.maxX);
        treeGroup.position.z = prng.randFloat(plainsBounds.minZ, plainsBounds.maxZ);
        
        scene.add(treeGroup);
        mapFeatures.push(treeGroup);
        buildingMeshes.push(treeGroup); // Add to building meshes for collision detection
    }
    
    // Small bushes and grass clumps for minor cover
    const numVegetation = prng.nextInt(20, 35);
    for (let i = 0; i < numVegetation; i++) {
        const vegSize = prng.randFloat(0.8, 2.5);
        const vegGeometry = new THREE.SphereGeometry(vegSize, 8, 6);
        const vegetation = new THREE.Mesh(vegGeometry, plainsGrassMaterial);
        
        vegetation.position.x = prng.randFloat(plainsBounds.minX, plainsBounds.maxX);
        vegetation.position.y = vegSize * 0.3;
        vegetation.position.z = prng.randFloat(plainsBounds.minZ, plainsBounds.maxZ);
        vegetation.scale.y = 0.4; // Make bushes low
        
        vegetation.castShadow = true;
        vegetation.receiveShadow = true;
        vegetation.name = `plains_vegetation_${i}`;
        scene.add(vegetation);
        mapFeatures.push(vegetation);
    }
}

function generateMountainMap() {
    if (!prng) {
        console.error("generateMountainMap: PRNG not initialized!");
        return;
    }

    
    // First, try to load via fetch to check if file exists
    const fbxPath = '/assets/89-terrain/uploads_files_2708212_terrain.fbx';
    
    fetch(fbxPath, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`File not accessible: ${response.status}`);
            }
            return loadFBXTerrain(fbxPath);
        })
        .catch(error => {
            generateProceduralMountainMap();
        });
}

function loadFBXTerrain(fbxPath: string) {
    const fbxLoader = new FBXLoader();
    
    // Load the terrain FBX model
    fbxLoader.load(
        fbxPath,
        (terrainModel) => {
            
            // Debug: Log all children in the model
            terrainModel.traverse((child: any) => {
                if (child.geometry) {
                }
            });
            
            // Set up terrain material
            const terrainMaterial = new THREE.MeshStandardMaterial({
                color: 0x8B7355, // Mountain brown
                roughness: 0.8,
                metalness: 0.1
            });

            let meshCount = 0;
            // Apply material to all meshes in the model
            terrainModel.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                    meshCount++;
                    if (child.material) {
                        // Dispose old material to prevent memory leaks
                        if (Array.isArray(child.material)) {
                            child.material.forEach((mat: any) => mat.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                    child.material = terrainMaterial;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });


            // Use the terrain as-is, just scale appropriately for gameplay
            // Scale to fit the game's coordinate system (similar to other maps)
            const terrainScale = 2.0; // Fixed scale for consistent gameplay
            terrainModel.scale.set(terrainScale, terrainScale, terrainScale);
            
            // Center the terrain at origin
            terrainModel.position.set(0, 0, 0);
            
            // Add to scene but keep separate from mapFeatures for proper collision handling
            scene.add(terrainModel);
            terrainMeshes.push(terrainModel); // Store for cleanup
            // DO NOT add to mapFeatures - terrain has specialized collision detection
            
            // Cache terrain meshes for performance
            cachedTerrainMeshes = [];
            terrainModel.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                    cachedTerrainMeshes.push(child);
                }
            });
            
            
            // Trigger respawn after terrain is loaded to ensure proper height calculation
            if (controls && scene) {
                setTimeout(() => {
                    triggerRespawn();
                }, 100); // Small delay to ensure terrain is fully processed
            }
        },
       
        (error) => {
            
            // Fallback to procedural generation if asset loading fails
            generateProceduralMountainMap();
        }
    );
}

// Procedural elements to complement terrain assets
function addProceduralMountainElements() {
    if (!prng) return;

    const mountainRockMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x696969, 
        roughness: 0.9, 
        metalness: 0.1 
    });

    const mountainBounds = 250;

    // Add scattered boulders
    const numBoulders = prng.nextInt(15, 25);
    for (let i = 0; i < numBoulders; i++) {
        const boulderSize = prng.randFloat(1.5, 6);
        const boulderGeometry = new THREE.SphereGeometry(boulderSize, 8, 8);
        const boulderMesh = new THREE.Mesh(boulderGeometry, mountainRockMaterial);
        
        let boulderX, boulderZ;
        let attempts = 0;
        do {
            boulderX = prng.randFloat(-mountainBounds, mountainBounds);
            boulderZ = prng.randFloat(-mountainBounds, mountainBounds);
            attempts++;
        } while (attempts < 10 && mapFeatures.some(feature => 
            Math.abs(feature.position.x - boulderX) < 8 && 
            Math.abs(feature.position.z - boulderZ) < 8
        ));
        
        boulderMesh.position.set(boulderX, boulderSize / 2, boulderZ);
        boulderMesh.scale.set(1, prng.randFloat(0.7, 1.3), 1);
        boulderMesh.castShadow = true;
        boulderMesh.receiveShadow = true;
        scene.add(boulderMesh);
        mapFeatures.push(boulderMesh);
        buildingMeshes.push(boulderMesh); // Add to building meshes for collision detection
    }

    // Add sparse mountain trees
    const numTrees = prng.nextInt(3, 8);
    for (let i = 0; i < numTrees; i++) {
        const treeHeight = prng.randFloat(6, 12);
        const treeRadius = prng.randFloat(1.5, 3);
        
        // Tree trunk
        const trunkGeometry = new THREE.CylinderGeometry(treeRadius * 0.3, treeRadius * 0.4, treeHeight * 0.6);
        const trunkMesh = new THREE.Mesh(trunkGeometry, new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, 
            roughness: 0.8 
        }));
        
        let treeX, treeZ;
        let attempts = 0;
        do {
            treeX = prng.randFloat(-mountainBounds + 20, mountainBounds - 20);
            treeZ = prng.randFloat(-mountainBounds + 20, mountainBounds - 20);
            attempts++;
        } while (attempts < 10 && mapFeatures.some(feature => 
            Math.abs(feature.position.x - treeX) < 12 && 
            Math.abs(feature.position.z - treeZ) < 12
        ));
        
        trunkMesh.position.set(treeX, treeHeight * 0.3, treeZ);
        trunkMesh.castShadow = true;
        scene.add(trunkMesh);
        mapFeatures.push(trunkMesh);
        buildingMeshes.push(trunkMesh); // Add to building meshes for collision detection
        
        // Tree foliage
        const foliageGeometry = new THREE.ConeGeometry(treeRadius, treeHeight * 0.6, 8);
        const foliageMesh = new THREE.Mesh(foliageGeometry, new THREE.MeshStandardMaterial({ 
            color: 0x228B22, 
            roughness: 0.8 
        }));
        foliageMesh.position.set(treeX, treeHeight * 0.8, treeZ);
        foliageMesh.castShadow = true;
        scene.add(foliageMesh);
        mapFeatures.push(foliageMesh);
    }
}

// Fallback function if asset loading fails
function generateProceduralMountainMap() {
    if (!prng) return;

    const mountainRockMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x696969, 
        roughness: 0.9, 
        metalness: 0.1 
    });

    const mountainBounds = 350;

    // Create a few large mountain peaks as fallback
    const numPeaks = prng.nextInt(2, 4);
    for (let i = 0; i < numPeaks; i++) {
        const peakHeight = prng.randFloat(30, 60);
        const peakRadius = prng.randFloat(20, 35);
        
        const peakGeometry = new THREE.ConeGeometry(peakRadius, peakHeight, 8);
        const peakMesh = new THREE.Mesh(peakGeometry, mountainRockMaterial);
        
        let peakX, peakZ;
        let attempts = 0;
        do {
            peakX = prng.randFloat(-mountainBounds, mountainBounds);
            peakZ = prng.randFloat(-mountainBounds, mountainBounds);
            attempts++;
        } while (attempts < 15 && mapFeatures.some(feature => 
            Math.abs(feature.position.x - peakX) < 50 && 
            Math.abs(feature.position.z - peakZ) < 50
        ));
        
        peakMesh.position.set(peakX, peakHeight / 2, peakZ);
        peakMesh.castShadow = true;
        peakMesh.receiveShadow = true;
        scene.add(peakMesh);
        mapFeatures.push(peakMesh);
    }

    addProceduralMountainElements();
    console.log(`Generated fallback procedural mountain map with ${mapFeatures.length} features`);
}

function generateMapFeatures() {
    mapFeatures.forEach(feature => {
        if (feature.parent === scene) { 
            scene.remove(feature);
        } else if (feature.parent && feature.parent !== scene) { 
            if (scene.getObjectById(feature.parent.id)) {
                 scene.remove(feature.parent);
            }
        } else if (scene.getObjectById(feature.id)) { 
            scene.remove(feature);
        }

        if (feature.geometry) feature.geometry.dispose();
        if (feature.name.startsWith("forest_bush_") && feature.material && !Array.isArray(feature.material)) {
            (feature.material as THREE.Material).dispose();
        }
    });
    mapFeatures.length = 0;
    buildingMeshes.length = 0; // Clear building meshes array
    
    // Clean up terrain meshes
    terrainMeshes.forEach(terrain => {
        if (terrain.parent === scene) scene.remove(terrain);
        terrain.traverse((child: any) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((mat: any) => mat.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
    });
    terrainMeshes.length = 0;
    cachedTerrainMeshes.length = 0;

    const treeGroupsToRemove = scene.children.filter(child => child.name.startsWith("forest_tree_group"));
    treeGroupsToRemove.forEach(group => scene.remove(group));
    const rampWrappersToRemove = scene.children.filter(child => child.name.startsWith("arena_ramp_wrapper_")); 
    rampWrappersToRemove.forEach(wrapper => scene.remove(wrapper));


    if (!prng) {
        console.error("generateMapFeatures: PRNG not initialized! Cannot generate map.");
        return;
    }
    if (currentMapType === undefined || currentMapType === null) {
        console.error("generateMapFeatures: currentMapType is not set! Cannot determine which map to generate. Defaulting to Arena.");
        currentMapType = MapType.ARENA; 
    }
    console.log(`Generating map features for type: ${MapType[currentMapType]} (Seed: ${currentMapSeed})`);


    if (currentMapType === MapType.URBAN) {
        generateUrbanMap();
    } else if (currentMapType === MapType.FOREST) {
        generateForestMap();
    } else if (currentMapType === MapType.PLAINS) {
        generatePlainsMap();
    } else if (currentMapType === MapType.MOUNTAIN) {
        generateMountainMap();
    } else { 
        generateArenaMap();
    }
    console.log(`Generated ${mapFeatures.length} map features.`);
}

function createTargets() {
  if (!prng) { console.error("CreateTargets: PRNG not initialized!"); return; }
  const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  let MAX_TARGET_ATTEMPTS = 15;
  
  // Increase attempts for larger maps
  if (currentMapType === MapType.PLAINS) {
    MAX_TARGET_ATTEMPTS = 25; // More attempts needed for sparse large map
  } 
  // Use scale-based target generation
  const multiplier = getObjectCountMultiplier();
  const scale = getMapScale();
  let numTargets = Math.floor(40 * multiplier); // Base 40 targets, scaled by map size
  let boundsMultiplier = scale; // Use map scale directly
  
  // Map-specific Y positioning
  let yBase = 0.75 + (prng.next() * 12); 
  if (currentMapType === MapType.URBAN) {
    yBase = 0.75 + (prng.next() * 25);
  } else if (currentMapType === MapType.FOREST) {
    yBase = 0.75 + (prng.next() * 8); 
  } else if (currentMapType === MapType.PLAINS) {
    yBase = 0.75 + (prng.next() * 15); // Slightly higher for visibility
  } else if (currentMapType === MapType.MOUNTAIN) {
    yBase = 0.75 + (prng.next() * 20); // Appropriate height for terrain
  }
  console.log(`Creating ${numTargets} targets for map type ${currentMapType !== undefined ? MapType[currentMapType] : 'undefined'}`);

  for (let i = 0; i < numTargets; i++) {
    let placed = false;
    for (let attempt = 0; attempt < MAX_TARGET_ATTEMPTS; attempt++) {
        const r = prng.next();
        const g = prng.next();
        const b = prng.next();
        const boxMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(r,g,b) });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        
        box.position.x = (prng.next() - 0.5) * boundsMultiplier;
        if (currentMapType === MapType.URBAN) {
            box.position.y = 0.75 + (prng.next() * 25);
        } else if (currentMapType === MapType.FOREST) {
             box.position.y = 0.75 + (prng.next() * 5); 
        } else if (currentMapType === MapType.MOUNTAIN) {
            box.position.y = 0.75 + (prng.next() * 20); // Altitude matching terrain features
        } else { 
            box.position.y = 0.75 + (prng.next() * 12);
        }
        box.position.z = (prng.next() - 0.5) * boundsMultiplier;
        box.castShadow = true;
        box.receiveShadow = true;

        const targetBoundingBox = new THREE.Box3().setFromObject(box);
        let collisionWithMapFeature = false;
        for (const feature of mapFeatures) {
            const featureBoundingBox = new THREE.Box3().setFromObject(feature);
            if (targetBoundingBox.intersectsBox(featureBoundingBox)) {
                collisionWithMapFeature = true;
                break;
            }
        }

        if (!collisionWithMapFeature) {
            const targetId = `target_${i}_${currentMapSeed}_${prng.next().toString(36).substring(7)}`; 
            box.name = targetId;
            scene.add(box);
            targetMeshes.set(targetId, box);
            // Cache bounding box for performance
            const boundingBox = new THREE.Box3().setFromObject(box);
            targetBoundingBoxCache.set(targetId, boundingBox.clone().expandByScalar(PROJECTILE_RADIUS));
            placed = true;
            break;
        } else {
             if(box.geometry) box.geometry.dispose();
             if(box.material && !Array.isArray(box.material)) (box.material as THREE.Material).dispose();
        }
    }
    if (!placed) {
        // console.warn(`Could not place target ${i} after ${MAX_TARGET_ATTEMPTS} attempts.`);
    }
  }
  console.log(`Placed ${targetMeshes.size} targets.`);
}

function getNearestTarget(): { target: THREE.Mesh; distance: number; direction: THREE.Vector3 } | null {
  if (targetMeshes.size === 0 || !controls || !camera) return null;
  
  const playerPosition = controls.getObject().position;
  let nearestTarget: THREE.Mesh | null = null;
  let nearestDistance = Infinity;
  
  targetMeshes.forEach((target) => {
    const distance = playerPosition.distanceTo(target.position);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestTarget = target;
    }
  });
  
  if (nearestTarget) {
    const direction = new THREE.Vector3()
      .subVectors(nearestTarget.position, playerPosition)
      .normalize();
    
    return {
      target: nearestTarget,
      distance: nearestDistance,
      direction: direction
    };
  }
  
  return null;
}

function updateEnemyCompass() {
  const compassElement = document.getElementById('enemy-compass');
  const compassArrow = document.getElementById('compass-arrow');
  const compassDistance = document.getElementById('compass-distance');
  
  if (!compassElement || !compassArrow || !compassDistance) return;
  
  // Only show compass for enemy players in multiplayer mode
  if (gameMode === 'multiplayer' && remotePlayerMesh && controls && camera) {
    compassElement.style.display = 'block';
    
    const playerPosition = controls.getObject().position;
    const enemyPlayerPosition = remotePlayerMesh.position;
    
    // Calculate direction vector from player to enemy player
    const toEnemyPlayer = new THREE.Vector3()
      .subVectors(enemyPlayerPosition, playerPosition)
      .normalize();
    
    // Get camera's forward direction (where player is looking)
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    
    // Project both vectors onto the horizontal plane (Y = 0) for 2D compass calculation
    const flatCameraDir = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z).normalize();
    const flatEnemyPlayerDir = new THREE.Vector3(toEnemyPlayer.x, 0, toEnemyPlayer.z).normalize();
    
    /*
     * コンパス角度計算の説明:
     * 1. プレイヤーのカメラが向いている方向をコンパスの「北」(0度)とする
     * 2. 敵プレイヤーへの方向ベクトルとカメラの向きベクトルの間の角度を計算
     * 3. 外積(cross product)を使って回転方向を判定:
     *    - 正の値: 時計回り (右側)
     *    - 負の値: 反時計回り (左側)
     * 4. 内積(dot product)を使って前後の位置関係を判定:
     *    - 正の値: 前方
     *    - 負の値: 後方
     */
    
    // 2Dでの外積計算 (Z成分のみ): カメラ方向 × 敵プレイヤー方向
    const crossProduct = flatCameraDir.x * flatEnemyPlayerDir.z - flatCameraDir.z * flatEnemyPlayerDir.x;
    // 内積計算: カメラ方向 · 敵プレイヤー方向
    const dotProduct = flatCameraDir.dot(flatEnemyPlayerDir);
    
    // atan2を使用して正確な角度を計算 (-π to π)
    const angle = Math.atan2(crossProduct, dotProduct);
    
    // ラジアンを度に変換し、矢印の回転角度として適用
    // 負の符号: CSSの回転方向を調整 (時計回りが正の角度)
    const angleDegrees = -angle * (180 / Math.PI);
    
    // 矢印を回転させて敵プレイヤーの方向を指す
    compassArrow.style.transform = `rotate(${angleDegrees}deg)`;
    
    // 敵プレイヤーまでの距離を計算・表示
    const distance = Math.round(playerPosition.distanceTo(enemyPlayerPosition));
    compassDistance.textContent = `${distance}m`;
  } else {
    // マルチプレイヤーモードでない、または敵プレイヤーがいない場合はコンパスを非表示
    compassElement.style.display = 'none';
  }
}

function setupMultiplayerSceneElements() {
  if (remotePlayerMesh) {
      scene.remove(remotePlayerMesh);
      remotePlayerMesh.traverse(child => {
          if (child instanceof THREE.Mesh) {
              if (child.geometry) child.geometry.dispose();
          }
      });
  }
  if (remotePlayerHandgunMesh && remotePlayerHandgunMesh.parent) remotePlayerHandgunMesh.parent.remove(remotePlayerHandgunMesh);
  if (remotePlayerSniperMesh && remotePlayerSniperMesh.parent) remotePlayerSniperMesh.parent.remove(remotePlayerSniperMesh);
  if (remotePlayerSMGMesh && remotePlayerSMGMesh.parent) remotePlayerSMGMesh.parent.remove(remotePlayerSMGMesh);
  
  // Clean up remote bike model
  if (remotePlayerBikeModel) {
      scene.remove(remotePlayerBikeModel);
      remotePlayerBikeModel.traverse(child => {
          if (child instanceof THREE.Mesh) {
              if (child.geometry) child.geometry.dispose();
              if (child.material) {
                  if (Array.isArray(child.material)) {
                      child.material.forEach(mat => mat.dispose());
                  } else {
                      child.material.dispose();
                  }
              }
          }
      });
      remotePlayerBikeModel = null;
  }


  const remotePlayerMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500, roughness: 0.6, metalness: 0.3 });
  remotePlayerMesh = new THREE.Group(); 

  const headGeometry = new THREE.SphereGeometry(REMOTE_PLAYER_HEAD_RADIUS, 16, 12);
  const headMesh = new THREE.Mesh(headGeometry, remotePlayerMaterial);
  headMesh.position.y = REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y + REMOTE_PLAYER_HEAD_RADIUS;
  headMesh.castShadow = true; headMesh.receiveShadow = true;
  remotePlayerMesh.add(headMesh);

  const torsoGeometry = new THREE.BoxGeometry(REMOTE_PLAYER_TORSO_SIZE.x, REMOTE_PLAYER_TORSO_SIZE.y, REMOTE_PLAYER_TORSO_SIZE.z);
  const torsoMesh = new THREE.Mesh(torsoGeometry, remotePlayerMaterial);
  torsoMesh.position.y = REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y / 2;
  torsoMesh.castShadow = true; torsoMesh.receiveShadow = true;
  remotePlayerMesh.add(torsoMesh);

  const legsGeometry = new THREE.BoxGeometry(REMOTE_PLAYER_LEGS_SIZE.x, REMOTE_PLAYER_LEGS_SIZE.y, REMOTE_PLAYER_LEGS_SIZE.z);
  const legsMesh = new THREE.Mesh(legsGeometry, remotePlayerMaterial);
  legsMesh.position.y = REMOTE_PLAYER_LEGS_SIZE.y / 2;
  legsMesh.castShadow = true; legsMesh.receiveShadow = true;
  remotePlayerMesh.add(legsMesh);
  
  let remoteSpawnPos: THREE.Vector3;
  const currentSpawnPoints = getSpawnPointsForCurrentMap();
  
  // Get local player position to avoid overlap
  const localPlayerPosition = controls ? controls.getObject().position : new THREE.Vector3(0, PLAYER_HEIGHT, 0);
  
  // Select random spawn point for remote player, avoiding local player position
  // Scale minimum distance based on map size for better competitive balance
  const mapScale = getMapScale();
  const minDistance = Math.max(50, mapScale * 0.15); // At least 50 units, or 15% of map scale
  
  remoteSpawnPos = selectRandomSpawnPoint(
    currentSpawnPoints, 
    localPlayerPosition, 
    minDistance
  );
  remotePlayerMesh.position.set(remoteSpawnPos.x, remoteSpawnPos.y, remoteSpawnPos.z); 

  remotePlayerMesh.castShadow = true; remotePlayerMesh.receiveShadow = true;
  remotePlayerMesh.name = "remotePlayer_1";

  const remoteGunMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
  
  const remoteHandgunGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8); 
  remotePlayerHandgunMesh = new THREE.Mesh(remoteHandgunGeom, remoteGunMaterial);
  remotePlayerHandgunMesh.castShadow = true;
  remotePlayerHandgunMesh.visible = true; 
  remotePlayerMesh.add(remotePlayerHandgunMesh); 

  const remoteSniperGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
  remotePlayerSniperMesh = new THREE.Mesh(remoteSniperGeom, remoteGunMaterial);
  remotePlayerSniperMesh.castShadow = true;
  remotePlayerSniperMesh.visible = false;
  remotePlayerMesh.add(remotePlayerSniperMesh);

  const remoteSMGGeom = new THREE.BoxGeometry(0.08, 0.08, 0.5); // Simple box for remote SMG
  remotePlayerSMGMesh = new THREE.Mesh(remoteSMGGeom, remoteGunMaterial);
  remotePlayerSMGMesh.castShadow = true;
  remotePlayerSMGMesh.visible = false;
  remotePlayerMesh.add(remotePlayerSMGMesh);

  scene.add(remotePlayerMesh);
}

async function initPeerConnection() {
    console.log("Initializing PeerConnection...");
    if (peerConnection && peerConnection.signalingState !== 'closed') {
        console.log("Closing existing PeerConnection.");
        peerConnection.close();
    }
    
    const rtcConfig = await getIceServersConfiguration();
    peerConnection = new RTCPeerConnection(rtcConfig);
    console.log("PeerConnection created with configuration:", rtcConfig);
    
    // Add to multiplayer system immediately
    const primaryOpponentId = 'opponent';
    peerConnections.set(primaryOpponentId, peerConnection);
    
    if (p2pStatusText) p2pStatusText.textContent = 'Status: Initializing...';

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            console.log("Local ICE candidate gathered:", event.candidate);
            
            // Add to manual UI for fallback
            if (localIceTextarea) {
                localIceTextarea.value += JSON.stringify(event.candidate) + '\n';
            }
            
            // Send automatically through WebSocket signaling
            if (signalingSocket && signalingSocket.readyState === WebSocket.OPEN && currentRoom) {
                const candidateMessage = {
                    msg_type: 'ice-candidate',
                    data: event.candidate,
                    target: opponentClientId, // Target specific opponent
                    sender: clientId
                };
                signalingSocket.send(JSON.stringify(candidateMessage));
                console.log('Sent ICE candidate automatically to', opponentClientId);
            }
        } else {
            console.log("Local ICE candidate gathering complete (event.candidate is null).");
        }
    };
    peerConnection.onicecandidateerror = (event) => {
        console.error("ICE candidate error:", event);
        if (p2pStatusText) p2pStatusText.textContent = `Status: ICE Error - ${event.errorCode}`;
    };
    peerConnection.onicegatheringstatechange = () => {
        if (!peerConnection) return;
        console.log(`ICE gathering state changed: ${peerConnection.iceGatheringState}`);
        if (p2pStatusText) p2pStatusText.textContent = `Status: ICE Gathering - ${peerConnection.iceGatheringState}`;
    };
    peerConnection.onconnectionstatechange = () => {
        if (!peerConnection || !p2pStatusText) return;
        const state = peerConnection.connectionState;
        console.log(`Connection state changed: ${state}`);
        p2pStatusText.textContent = `Status: ${state}`;

        if (state === 'connected') {
            console.log("PeerConnection: Connected");
            // Add connected player to multiplayer system
            const primaryOpponentId = 'opponent'; // For backward compatibility
            connectedPlayers.set(primaryOpponentId, { playerId: primaryOpponentId, isConnected: true });
            updateLegacyVariables();
            updatePlayerCountDisplay();
        } else if (state === 'disconnected') {
            console.warn("PeerConnection: Disconnected. This might be temporary. Waiting for potential auto-reconnect or closure.");
            // Mark player as disconnected but don't remove yet
            const primaryOpponentId = 'opponent';
            const existingPlayer = connectedPlayers.get(primaryOpponentId);
            if (existingPlayer) {
                connectedPlayers.set(primaryOpponentId, { ...existingPlayer, isConnected: false });
            }
            updatePlayerCountDisplay();
            if (signalingPanel && gameMode === 'multiplayer') signalingPanel.style.display = 'block';
        } else if (state === 'failed') {
            console.error("PeerConnection: Failed. Attempting to reset P2P state.");
            // Remove failed connection
            connectedPlayers.delete('opponent');
            updateLegacyVariables();
            updatePlayerCountDisplay();
            if (signalingPanel && gameMode === 'multiplayer') signalingPanel.style.display = 'block';
            if (remotePlayerMesh) scene.remove(remotePlayerMesh); remotePlayerMesh = null;
            remotePlayerHandgunMesh = null; remotePlayerSniperMesh = null; remotePlayerSMGMesh = null;
            if (!isGameOver) resetP2PState(); 
        } else if (state === 'closed') {
            console.log("PeerConnection: Closed.");
            // Remove closed connection
            connectedPlayers.delete('opponent');
            updateLegacyVariables();
            updatePlayerCountDisplay();
            if (signalingPanel && gameMode === 'multiplayer') signalingPanel.style.display = 'block';
            if (remotePlayerMesh && remotePlayerMesh.parent) scene.remove(remotePlayerMesh); remotePlayerMesh = null;
            remotePlayerHandgunMesh = null; remotePlayerSniperMesh = null; remotePlayerSMGMesh = null;
        }
    };
    peerConnection.ondatachannel = (event) => {
        console.log("Data channel received:", event.channel.label);
        dataChannel = event.channel;
        
        // Add to multiplayer system
        const primaryOpponentId = 'opponent';
        dataChannels.set(primaryOpponentId, event.channel);
        // Note: Don't call updateLegacyVariables() here as it might reset peerConnection
        
        setupDataChannelEvents();
    };
}

function setupDataChannelEvents() {
    if (!dataChannel || !p2pStatusText) return;
    console.log("Setting up data channel events for:", dataChannel.label);
    dataChannel.onopen = () => {
        console.log(`Data channel '${dataChannel?.label}' opened.`);
        p2pStatusText.textContent = 'Status: Connected (Data Channel Open)';

        if (gameMode === 'multiplayer' && isPlayerOne) {
            currentMapSeed = Date.now();
            currentMapType = determineMapType(currentMapSeed, selectedMapType);
            prng = new PRNG(currentMapSeed); 
            spawnPrng = new PRNG(currentMapSeed + getSpawnSeedOffset()); 

            console.log("P1: Sending map seed:", currentMapSeed, "and map type:", currentMapType);
            sendGameEvent({
                type: 'map_seed',
                data: { seed: currentMapSeed, mapType: currentMapType } as GameEventMapSeedData
            });
            resetGameScene(); 
            if (signalingPanel) signalingPanel.style.display = 'none';
        } else if (gameMode === 'multiplayer' && !isPlayerOne) {
            console.log("P2: Data channel open, waiting for map seed.");
            if (signalingPanel) signalingPanel.style.display = 'none';
        }
    };
    dataChannel.onclose = () => {
        console.log(`Data channel '${dataChannel?.label}' closed.`);
    };
    dataChannel.onerror = (error) => {
        console.error(`Data channel '${dataChannel?.label}' error:`, error);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Data Channel Error';
    };
    dataChannel.onmessage = (event) => {
        if (isGameOver && JSON.parse(event.data as string).type !== 'game_over_notif') return;
        try {
            const message = JSON.parse(event.data as string);
            if (message.type === 'playerState' && remotePlayerMesh) {
                const state = message.data as PlayerState;
                // Adjust remote player position for terrain height
                let adjustedY = state.position.y - PLAYER_HEIGHT;
                if (currentMapType === MapType.MOUNTAIN) {
                    const terrainHeight = getTerrainHeightAt(state.position.x, state.position.z);
                    adjustedY = Math.max(adjustedY, terrainHeight);
                }
                
                // Set position and rotation only if NOT in bike mode (will be overridden later)
                if (!state.isOnBike) {
                    remotePlayerMesh.position.set(state.position.x, adjustedY, state.position.z);
                    
                    // Keep remote player always upright (only Y-axis rotation for direction)
                    remotePlayerMesh.rotation.set(0, state.quaternion.y * 2, 0); // Simple Y rotation approximation
                }

                if (remotePlayerHandgunMesh && remotePlayerSniperMesh && remotePlayerSMGMesh) {
                    remotePlayerHandgunMesh.visible = state.weaponType === 'handgun';
                    remotePlayerSniperMesh.visible = state.weaponType === 'sniper';
                    remotePlayerSMGMesh.visible = state.weaponType === 'smg';

                    let activeRemoteGunMesh: THREE.Mesh | null = null;
                    let hipOffset: THREE.Vector3 | null = null;
                    let adsOffset: THREE.Vector3 | null = null;

                    if (state.weaponType === 'handgun') {
                        activeRemoteGunMesh = remotePlayerHandgunMesh;
                        hipOffset = REMOTE_HANDGUN_HIP_OFFSET;
                        adsOffset = REMOTE_HANDGUN_ADS_OFFSET;
                    } else if (state.weaponType === 'sniper') {
                        activeRemoteGunMesh = remotePlayerSniperMesh;
                        hipOffset = REMOTE_SNIPER_HIP_OFFSET;
                        adsOffset = REMOTE_SNIPER_ADS_OFFSET;
                    } else if (state.weaponType === 'smg') {
                        activeRemoteGunMesh = remotePlayerSMGMesh;
                        hipOffset = REMOTE_SMG_HIP_OFFSET;
                        adsOffset = REMOTE_SMG_ADS_OFFSET;
                    }
                    
                    if (activeRemoteGunMesh && hipOffset && adsOffset) {
                        if (state.aiming) {
                            activeRemoteGunMesh.position.copy(adsOffset);
                            activeRemoteGunMesh.rotation.set(Math.PI / 2, 0, 0); 
                        } else {
                            activeRemoteGunMesh.position.copy(hipOffset);
                            let hipRotX = Math.PI / 2 + 0.3;
                            let hipRotZ = 0.1;
                            if (state.weaponType === 'sniper') { hipRotZ = 0.05;}
                            else if (state.weaponType === 'smg') { hipRotX = Math.PI / 2 + 0.25; hipRotZ = 0.08;}
                            activeRemoteGunMesh.rotation.set(hipRotX, 0, hipRotZ); 
                        }
                    }
                }

                // Handle bike mode synchronization
                if (state.isOnBike) {
                    console.log("Received bike state:", {
                        isOnBike: state.isOnBike,
                        bikePosition: state.bikePosition,
                        bikeDirection: state.bikeDirection,
                        bikeBankAngle: state.bikeBankAngle
                    });
                    
                    // Create remote bike model if it doesn't exist
                    if (!remotePlayerBikeModel) {
                        remotePlayerBikeModel = createBikeModel();
                        remotePlayerBikeModel.name = "remoteBike";
                        scene.add(remotePlayerBikeModel);
                        
                    }
                    
                    // Use bike position if available, otherwise fall back to player position
                    const bikePos = state.bikePosition || state.position;
                    let bikeY = bikePos.y;
                    
                    // For bike mode, trust the sent position more and apply minimal adjustment
                    if (currentMapType === MapType.MOUNTAIN && state.bikePosition) {
                        // Only apply terrain adjustment if significantly below expected height
                        const terrainHeight = getTerrainHeightAt(bikePos.x, bikePos.z);
                        bikeY = Math.max(bikeY, terrainHeight - 1); // Allow slightly below terrain
                    }
                    
                    // Show and position remote bike
                    remotePlayerBikeModel.visible = true;
                    remotePlayerBikeModel.position.set(bikePos.x, bikeY, bikePos.z);
                    
                    // Apply bike direction and banking (add 180° for correct orientation)
                    if (state.bikeDirection !== undefined) {
                        remotePlayerBikeModel.rotation.y = state.bikeDirection + Math.PI;
                    }
                    if (state.bikeBankAngle !== undefined) {
                        remotePlayerBikeModel.rotation.z = state.bikeBankAngle;
                    }
                    
                    // Position remote player on the bike (match bike height)
                    remotePlayerMesh.position.set(bikePos.x, bikeY, bikePos.z);
                    
                    // For bike mode, only apply basic orientation - avoid complex rotations
                    if (state.bikeDirection !== undefined) {
                        // Simple Y rotation for body direction (add 180° to match bike orientation)
                        remotePlayerMesh.rotation.set(0, state.bikeDirection + Math.PI, 0);
                    }
                    
                    // Apply only slight banking to avoid weird rotations
                    if (state.bikeBankAngle !== undefined) {
                        remotePlayerMesh.rotation.z = state.bikeBankAngle * 0.3; // Reduced banking effect
                    }
                    
                } else {
                    // Hide remote bike when not in bike mode
                    if (remotePlayerBikeModel) {
                        remotePlayerBikeModel.visible = false;
                    }
                    
                    // Apply normal position and rotation when not on bike
                    remotePlayerMesh.position.set(state.position.x, adjustedY, state.position.z);
                    
                    // Keep remote player always upright (only Y-axis rotation for direction)
                    remotePlayerMesh.rotation.set(0, state.quaternion.y * 2, 0); // Simple Y rotation approximation
                }

            } else if (message.type === 'gameEvent') {
                const gameEvent = message.data as GameEvent; 
                if (gameEvent.type === 'map_seed' && !isPlayerOne) { 
                    const seedData = gameEvent.data as GameEventMapSeedData;
                    currentMapSeed = seedData.seed;
                    currentMapType = seedData.mapType; 
                    prng = new PRNG(currentMapSeed!); 
                    spawnPrng = new PRNG(currentMapSeed! + getSpawnSeedOffset()); 
                    console.log("P2: Received and set map seed:", currentMapSeed, "and map type:", currentMapType);
                    resetGameScene(); 
                }
                else if (gameEvent.type === 'shoot' && gameEvent.data) {
                     const shootData = gameEvent.data as GameEventShootData;
                     if (shootData.muzzlePosition && shootData.direction) {
                        const projectileMesh = new THREE.Mesh(projectileGeometry, remoteProjectileMaterial); 
                        projectileMesh.castShadow = true;
                        projectileMesh.position.set(shootData.muzzlePosition.x, shootData.muzzlePosition.y, shootData.muzzlePosition.z);
                        
                        let speed = weaponStatsDB.handgun.projectileSpeed!; // Default
                        if (shootData.weaponType === 'sniper' && weaponStatsDB.sniper.projectileSpeed) {
                            speed = weaponStatsDB.sniper.projectileSpeed;
                        } else if (shootData.weaponType === 'smg' && weaponStatsDB.smg.projectileSpeed) {
                            speed = weaponStatsDB.smg.projectileSpeed;
                        }
                        
                        const remoteProj: RemoteProjectile = {
                            mesh: projectileMesh,
                            velocity: new THREE.Vector3(shootData.direction.x, shootData.direction.y, shootData.direction.z).multiplyScalar(speed),
                            lifeTime: 0,
                            spawnTime: performance.now(),
                            weaponType: shootData.weaponType,
                            distanceTraveled: 0,
                            initialPosition: new THREE.Vector3(shootData.muzzlePosition.x, shootData.muzzlePosition.y, shootData.muzzlePosition.z)
                        };
                        scene.add(projectileMesh);
                        remoteProjectiles.push(remoteProj);
                     }
                }
                else if (gameEvent.type === 'hit_opponent') {
                    if(isGameOver) return;
                    const hitData = gameEvent.data as GameEventHitOpponentData;
                    
                    // Use the new health system
                    takeDamage(hitData.damageDealt);

                    const hitOverlay = document.createElement('div');
                    hitOverlay.style.position = 'absolute'; hitOverlay.style.top = '0'; hitOverlay.style.left = '0';
                    hitOverlay.style.width = '100%'; hitOverlay.style.height = '100%';
                    hitOverlay.style.zIndex = '1000';
                    document.body.appendChild(hitOverlay);
                    setTimeout(() => { if (document.body.contains(hitOverlay)) document.body.removeChild(hitOverlay); }, 150);
                    
                    // Different messages for headshots
                    const hitMessage = hitData.isHeadshot 
                        ? `HEADSHOT! -${hitData.damageDealt} HP | Health: ${Math.round(currentHealth)}`
                        : `HIT! -${hitData.damageDealt} HP | Health: ${Math.round(currentHealth)}`;
                    showTemporaryMessage(hitMessage, 500);

                    // Update playerHealth to sync with new system
                    
                    if (currentHealth <= 0) {
                        myDeaths++;
                        sendGameEventToOtherPlayers({ 
                type: 'i_was_defeated',
                data: { defeatedPlayerId: clientId || 'unknown' } as GameEventDefeatedData
            });
                        
                        
                        if (checkDefeatCondition()) {
                            handleGameOver(false); 
                        } else {
                            // Reset both health systems
                            currentHealth = MAX_HEALTH;
                            triggerRespawn();
                        }
                    }
                } else if (gameEvent.type === 'i_was_defeated') {
                    
                    // Handle opponent death in multiplayer
                    
                    
                } else if (gameEvent.type === 'game_over_notif') {
                    const gameOverData = gameEvent.data as GameEventGameOverData;
                    if (gameOverData.winnerIsPlayerOne !== null && !isGameOver) { 
                        const thisPlayerWon = (isPlayerOne === gameOverData.winnerIsPlayerOne);
                        
                        // Remove the defeated player's mesh from the scene
                        if (gameOverData.defeatedPlayerId) {
                            console.log(`Removing mesh for defeated player: ${gameOverData.defeatedPlayerId}`);
                            removeRemotePlayerMeshes(gameOverData.defeatedPlayerId);
                        }
                        
                        handleGameOver(thisPlayerWon);
                    }
                } else if (gameEvent.type === 'bike_hit') {
                    const bikeHitData = gameEvent.data as GameEventBikeHitData;
                    
                    // Apply bike damage
                    damageBike(bikeHitData.damageDealt);
                    
                    // Show bike damage message
                    showTemporaryMessage(`Bike Hit! -${bikeHitData.damageDealt} HP | Bike Health: ${Math.round(bikeHealth)}`, 500);
                } else if (gameEvent.type === 'start_game_request') {
                    const requestData = gameEvent.data as GameEventStartGameRequestData;
                    console.log(`Received game start request from player: ${requestData.requesterId}`);
                    
                    // Show notification and auto-start the game
                    showTemporaryMessage(`Game starting! Request from ${requestData.requesterId}`, 500);
                    startGameFromRequest();
                } else if (gameEvent.type === 'bike_exploded') {
                    const explodedData = gameEvent.data as GameEventBikeExplodedData;
                    
                    // Create explosion effect at remote player's bike position
                    if (remotePlayerBikeModel && remotePlayerBikeModel.parent) {
                        createBikeExplosion(new THREE.Vector3(
                            explodedData.playerPosition.x,
                            explodedData.playerPosition.y,
                            explodedData.playerPosition.z
                        ), false); // No camera shake for remote explosions
                    }
                    
                    console.log("Remote player's bike exploded!");
                }
            }
        } catch (error) { console.error("Failed to parse message or update remote player:", error); }
    };
}

async function createOffer() {
    console.log("Creating offer...");
    isPlayerOne = true;
    if (localIceTextarea) localIceTextarea.value = '';
    await initPeerConnection(); // Now async
    if (!peerConnection || !localSdpTextarea || !p2pStatusText) {
        console.error("Cannot create offer: PeerConnection or UI elements missing.");
        return;
    }
    console.log("Creating data channel 'gameData'.");
    dataChannel = peerConnection.createDataChannel("gameData");
    
    // Add to multiplayer system
    const primaryOpponentId = 'opponent';
    dataChannels.set(primaryOpponentId, dataChannel);
    // Note: Don't call updateLegacyVariables() here as it might reset peerConnection
    
    setupDataChannelEvents(); 
    try {
        const offer = await peerConnection.createOffer();
        console.log("Offer created:", offer);
        await peerConnection.setLocalDescription(offer);
        console.log("Local description set with offer.");
        localSdpTextarea.value = JSON.stringify(offer);
        p2pStatusText.textContent = 'Status: Offer created. Send to Peer 2.';
    } catch (e) {
        console.error("Error creating offer or setting local description:", e);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Error creating offer.';
        isPlayerOne = null; 
    }
}

async function createAnswer() {
    console.log("Creating answer...");
    isPlayerOne = false;
    if (localIceTextarea) localIceTextarea.value = '';
    await initPeerConnection(); // Now async
    if (!peerConnection || !remoteSdpTextarea || !localSdpTextarea || !p2pStatusText) {
        console.error("Cannot create answer: PeerConnection or UI elements missing.");
        return;
    }
    const remoteOfferText = remoteSdpTextarea.value;
    if (!remoteOfferText) {
        alert("Paste Peer 1's offer first!");
        console.warn("Remote offer text is empty.");
        return;
    }
    try {
        console.log("Parsing remote offer:", remoteOfferText);
        const offer = JSON.parse(remoteOfferText);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        console.log("Remote description (offer) set.");
        const answer = await peerConnection.createAnswer();
        console.log("Answer created:", answer);
        await peerConnection.setLocalDescription(answer);
        console.log("Local description set with answer.");
        localSdpTextarea.value = JSON.stringify(answer);
        p2pStatusText.textContent = 'Status: Answer created. Send to Peer 1.';
    } catch (e) {
        console.error("Error creating answer or setting descriptions:", e);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Error creating answer.';
        isPlayerOne = null; 
    }
}

async function setRemoteDescription() {
    if (!remoteSdpTextarea || !p2pStatusText) {
         console.error("Cannot set remote SDP: UI elements missing.");
        return;
    }
    const remoteSdpValue = remoteSdpTextarea.value;
    if (!remoteSdpValue) {
        alert("Paste remote SDP first!");
        console.warn("Remote SDP text is empty.");
        return;
    }
    console.log("Setting remote description with SDP:", remoteSdpValue);
    
    let sdpInit: RTCSessionDescriptionInit;
    try {
        sdpInit = JSON.parse(remoteSdpValue) as RTCSessionDescriptionInit;
    } catch (e) {
        alert("Invalid JSON in remote SDP textarea.");
        console.error("Error parsing remote SDP JSON:", e, "\nInput:", remoteSdpValue);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Invalid remote SDP format.';
        return;
    }

    if (!peerConnection) {
       if (sdpInit.type === 'offer') {
           console.log("PeerConnection not initialized, and received an offer. Initializing as Peer 2.");
           isPlayerOne = false;
           if (localIceTextarea) localIceTextarea.value = '';
           await initPeerConnection(); // Now async
       } else {
           alert("Connection not initialized. Player 1 should 'Create Offer' first if this is an answer.");
           console.warn("Received non-offer SDP but PeerConnection is not initialized.");
           return;
       }
    }
    if (!peerConnection) { // Check again after conditional await
        alert("PeerConnection failed to initialize after attempting for offer.");
        console.error("PeerConnection still null after conditional init for offer.");
        return;
    }

    try {
        if (sdpInit.type === 'offer' && !isPlayerOne) { 
             console.log("Setting remote offer. This client is Peer 2.");
             if (localIceTextarea && peerConnection.signalingState === 'stable') localIceTextarea.value = ''; 
        } else if (sdpInit.type === 'answer' && isPlayerOne) { 
            console.log("Setting remote answer. This client is Peer 1.");
        }
        await peerConnection.setRemoteDescription(new RTCSessionDescription(sdpInit));
        console.log(`Remote description (${sdpInit.type}) set successfully.`);
        p2pStatusText.textContent = `Status: Remote ${sdpInit.type} set.`;
        remoteSdpTextarea.value = '';
    } catch (e) {
        console.error("Error setting remote description:", e, "\nSDP:", sdpInit);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Error setting remote description.';
    }
}

async function addRemoteIceCandidate() { 
    if (!peerConnection || !remoteIceTextarea || !p2pStatusText) {
        alert("Initialize connection or UI elements missing for adding ICE candidate.");
        console.warn("Cannot add remote ICE: PeerConnection or UI elements missing.");
        return;
    }
    const inputText = remoteIceTextarea.value.trim();
    if (!inputText) {
        alert("Paste remote ICE candidate(s) first! Each candidate JSON should be on a new line.");
        console.warn("Remote ICE textarea is empty.");
        return;
    }

    console.log("Attempting to add remote ICE candidates from textarea:\n", inputText);
    const candidatesTexts = inputText.split('\n');
    let successCount = 0;
    let errorCount = 0;
    let candidatesProcessed = 0;

    for (const candidateText of candidatesTexts) {
        const trimmedCandidateText = candidateText.trim();
        if (!trimmedCandidateText) {
            console.log("Skipping empty line in ICE candidates input.");
            continue; 
        }
        candidatesProcessed++;
        console.log(`Processing ICE candidate string (line ${candidatesProcessed}): ${trimmedCandidateText}`);
        try {
            const candidateInit = JSON.parse(trimmedCandidateText);
            if (candidateInit && (typeof candidateInit.candidate === 'string' || typeof candidateInit.sdpMid === 'string' || typeof candidateInit.sdpMLineIndex === 'number')) {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidateInit));
                console.log("Successfully added remote ICE candidate:", candidateInit);
                successCount++;
            } else {
                console.warn("Skipping invalid ICE candidate structure (parsed but not valid RTCIceCandidateInit):", trimmedCandidateText, "\nParsed:", candidateInit);
                errorCount++;
            }
        } catch (e) {
            console.error(`Error parsing or adding remote ICE candidate: "${trimmedCandidateText}"`, e);
            errorCount++;
        }
    }

    let statusMsg = "Status: ";
    if (candidatesProcessed === 0) {
        statusMsg += 'No ICE candidates found in input.';
    } else {
        statusMsg += `Processed ${candidatesProcessed} candidate(s). Added: ${successCount}. Failed: ${errorCount}.`;
        if (errorCount > 0) {
            statusMsg += " Check console for details.";
        }
    }
    p2pStatusText.textContent = statusMsg;
    console.log(statusMsg);

    if (successCount > 0 || candidatesProcessed > 0) { 
      remoteIceTextarea.value = '';
    }
}

function sendPlayerState() {
    if (controls.isLocked && !isGameOver) {
        const playerObject = controls.getObject();
        
        // Use bike position when on bike, otherwise use player position
        const currentPosition = isOnBike ? bikePosition : playerObject.position;
        
        const state: PlayerState = {
            position: { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z }, 
            quaternion: { x: playerObject.quaternion.x, y: playerObject.quaternion.y, z: playerObject.quaternion.z, w: playerObject.quaternion.w },
            aiming: isAimingWithMouseActual || isAimingWithKeyActual,
            weaponType: currentEquippedWeapon,
            isOnBike: isOnBike,
            bikeDirection: isOnBike ? bikeDirection : undefined,
            bikeBankAngle: isOnBike ? bikeBankAngle : undefined,
            bikePosition: isOnBike ? { x: bikePosition.x, y: bikePosition.y, z: bikePosition.z } : undefined,
        };
        
        // Send to ALL connected players (new multiplayer system)
        const connectedIds = getConnectedPlayerIds();
        let sentCount = 0;
        
        for (const playerId of connectedIds) {
            const channel = dataChannels.get(playerId);
            if (channel && channel.readyState === 'open') {
                try {
                    channel.send(JSON.stringify({ type: 'playerState', data: state }));
                    sentCount++;
                } catch (e) {
                    console.error(`Error sending player state to ${playerId}:`, e);
                }
            }
        }
        
        // Fallback to legacy system for backward compatibility
        if (sentCount === 0 && dataChannel && dataChannel.readyState === 'open') {
            try {
                dataChannel.send(JSON.stringify({ type: 'playerState', data: state }));
                console.log("Sent player state via legacy channel");
            } catch (e) {
                console.error("Error sending player state via legacy channel:", e);
            }
        }
        
        
    }
}

// Send game event to all connected players
function sendGameEventToAllPlayers(event: GameEvent) {
    const connectedIds = getConnectedPlayerIds();
    for (const playerId of connectedIds) {
        sendGameEventToPlayer(playerId, event);
    }
}

function sendGameEventToOtherPlayers(event: GameEvent) {
    const connectedIds = getConnectedPlayerIds();
    for (const playerId of connectedIds) {
        if (playerId !== clientId) {
            sendGameEventToPlayer(playerId, event);
        }
    }
}

// Send game event to a specific player
function sendGameEventToPlayer(playerId: string, event: GameEvent) {
    const channel = dataChannels.get(playerId);
    if (channel && channel.readyState === 'open') {
        try {
            channel.send(JSON.stringify({ type: 'gameEvent', data: event }));
        } catch (e) {
            console.error(`Error sending game event to player ${playerId}:`, e, "\nEvent:", event);
        }
    } else {
        console.warn(`Cannot send game event to player ${playerId}: channel not available or not open`);
    }
}

// Legacy function for backward compatibility
function sendGameEvent(event: GameEvent) {
    if (dataChannel && dataChannel.readyState === 'open') {
        try {
            dataChannel.send(JSON.stringify({ type: 'gameEvent', data: event }));
        } catch (e) {
            console.error("Error sending game event:", e, "\nEvent:", event);
        }
    } else {
        // For new multiplayer mode, send to all players
        sendGameEventToAllPlayers(event);
    }
}

function triggerRespawn() {
    const currentSpawnPoints = getSpawnPointsForCurrentMap();
    if (!controls || !scene || currentSpawnPoints.length === 0 || !prng) return;
    const playerObject = controls.getObject();
    let newSpawnPoint: THREE.Vector3;

    if (gameMode === 'multiplayer' && remotePlayerMesh && remotePlayerMesh.parent) { 
        const remotePlayerWorldPosition = new THREE.Vector3();
        remotePlayerMesh.getWorldPosition(remotePlayerWorldPosition); 
        
        // Scale minimum distance based on map size for better competitive balance
        const mapScale = getMapScale();
        const minDistance = Math.max(50, mapScale * 0.15); // At least 50 units, or 15% of map scale
        
        newSpawnPoint = selectRandomSpawnPoint( 
            currentSpawnPoints,
            remotePlayerWorldPosition, 
            minDistance 
        );
    } else {
        newSpawnPoint = selectRandomSpawnPoint(currentSpawnPoints); 
    }
    
    playerObject.position.copy(newSpawnPoint);
    
    // Reset health on respawn
    currentHealth = MAX_HEALTH;
    lastDamageTime = 0;
    lastMovementTime = 0;
    isRegeneratingHealth = false;
    isMoving = false;
    updateHealthDisplay();
    playerObject.rotation.y = 0; 
    
    if(pitchObject) {
        pitchObject.rotation.x = 0; 
    }
    
    // Reset bike state on respawn
    if (isOnBike) {
        // Remove bike from scene
        if (bikeModel) {
            scene.remove(bikeModel);
            bikeModel = null;
        }
        
        // Exit bike mode
        isOnBike = false;
        
        // Reset bike state
        bikeHealth = bikeMaxHealth;
        bikeSpeed = 0;
        
        // Hide bike UI elements
        const speedometer = document.getElementById('speedometer');
        const bikeDurability = document.getElementById('bike-durability');
        if (speedometer) speedometer.style.display = 'none';
        if (bikeDurability) bikeDurability.style.display = 'none';
    }
    
    velocity.set(0,0,0);
    showTemporaryMessage("RESPAWNED!", 500);
}

function handleGameOver(playerWon: boolean) {
    if (isGameOver) return;
    isGameOver = true;
    isFiringSMGActual = false; // Ensure SMG stops firing on game over
    controls.unlock();
    console.log(`Game Over. Player ${playerWon ? "WON" : "LOST"}. My PlayerOne status: ${isPlayerOne}`);

    const message = playerWon ? "YOU WIN!" : "YOU LOSE!";
    if (instructionOverlay && instructionText) {
        instructionOverlay.style.display = 'flex';
        instructionText.textContent = message;
        if (p2pInstructionText) p2pInstructionText.style.display = 'none';
    }
    if (dataChannel ) { 
         const gameOverData: GameEventGameOverData = { 
             winnerIsPlayerOne: playerWon ? isPlayerOne : (isPlayerOne === null ? null : !isPlayerOne),
             defeatedPlayerId: playerWon ? undefined : (clientId || 'unknown')
         };
         console.log("Sending game_over_notif, data:", gameOverData);
         sendGameEvent({ type: 'game_over_notif', data: gameOverData });
    }

    setTimeout(() => {
        gameMode = 'idle';
        if (mainMenuDiv) mainMenuDiv.style.display = 'flex';
        if (gameContainer) gameContainer.style.display = 'none';
        if (instructionOverlay && instructionText) {
            instructionOverlay.style.display = 'none';
            instructionText.textContent = "Click to Start";
        }
        if (signalingPanel) signalingPanel.style.display = 'none';
    }, 5000);
}

function onWindowResize() { 
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function queueInput(action: () => void) { 
  pendingInputs.push({ timestamp: performance.now(), action });
}

function jump() {
  if (isOnGround && controls) {
    verticalVelocity = JUMP_VELOCITY;
    isOnGround = false;
  }
}

// Check if slope is climbable by testing angle
function canClimbSlope(fromPos: THREE.Vector3, toPos: THREE.Vector3, normal: THREE.Vector3): boolean {
  const slopeAngle = Math.acos(Math.abs(normal.y)) * (180 / Math.PI);
  return slopeAngle <= MAX_CLIMBABLE_ANGLE;
}

// Try to step up small obstacles automatically
function tryStepUp(originalPos: THREE.Vector3, intendedPos: THREE.Vector3): THREE.Vector3 | null {
  if (currentMapType !== MapType.MOUNTAIN || cachedTerrainMeshes.length === 0) {
    return null;
  }
  
  // Cast ray downward from elevated position to find step-up height
  const stepUpPos = intendedPos.clone();
  stepUpPos.y = originalPos.y + STEP_UP_HEIGHT;
  
  const raycaster = new THREE.Raycaster();
  raycaster.set(new THREE.Vector3(stepUpPos.x, stepUpPos.y + 1, stepUpPos.z), new THREE.Vector3(0, -1, 0));
  
  const intersects = raycaster.intersectObjects(cachedTerrainMeshes);
  
  if (intersects.length > 0) {
    const groundHeight = intersects[0].point.y;
    const stepHeight = groundHeight - originalPos.y + PLAYER_HEIGHT;
    
    // Check if step is within acceptable range
    if (stepHeight > 0 && stepHeight <= STEP_UP_HEIGHT) {
      return new THREE.Vector3(intendedPos.x, groundHeight + PLAYER_HEIGHT, intendedPos.z);
    }
  }
  
  return null;
}

// Enhanced slope detection using raycast
function checkSlopeMovement(fromPos: THREE.Vector3, moveDir: THREE.Vector3): { canMove: boolean, adjustedPos?: THREE.Vector3 } {
  if (currentMapType !== MapType.MOUNTAIN || cachedTerrainMeshes.length === 0) {
    return { canMove: true };
  }
  
  // Cast ray forward to detect slope
  const rayOrigin = fromPos.clone();
  rayOrigin.y += PLAYER_HEIGHT * 0.5;
  
  const rayDirection = moveDir.clone().normalize();
  const raycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, PLAYER_RADIUS * 2);
  
  const intersects = raycaster.intersectObjects(cachedTerrainMeshes);
  
  if (intersects.length > 0) {
    const hit = intersects[0];
    const normal = hit.face?.normal;
    
    if (normal) {
      // Transform normal to world space
      const worldNormal = normal.clone().transformDirection(hit.object.matrixWorld);
      
      // Check if this is a climbable slope
      if (canClimbSlope(fromPos, hit.point, worldNormal)) {
        // Try step-up for small obstacles
        const intendedPos = fromPos.clone().add(moveDir);
        const stepUpResult = tryStepUp(fromPos, intendedPos);
        
        if (stepUpResult) {
          return { canMove: true, adjustedPos: stepUpResult };
        }
        
        return { canMove: true }; // Allow movement on climbable slopes
      }
      
      return { canMove: false }; // Block movement on steep slopes
    }
  }
  
  return { canMove: true }; // No obstacle detected
}

// Health management functions
function takeDamage(amount: number): void {
  currentHealth = Math.max(0, currentHealth - amount);
  lastDamageTime = performance.now();
  isRegeneratingHealth = false;
  
  updateHealthDisplay();
  
  // Note: Death handling is done in hit_opponent event processing for multiplayer
  // and other specific contexts. This function only handles damage application.
}

// Check if player is currently moving
function updateMovementStatus(): void {
  const currentTime = performance.now();
  const wasMoving = isMoving;
  
  // Check if any movement keys are pressed or if there's significant horizontal velocity
  const hasMovementInput = moveForwardActual || moveBackwardActual || moveLeftActual || moveRightActual;
  const hasVelocity = horizontalVelocity.length() > 0.1;
  
  isMoving = hasMovementInput || hasVelocity;
  
  if (isMoving) {
    lastMovementTime = currentTime;
  }
  
  // Debug info (can be removed later)
  if (wasMoving !== isMoving) {
    console.log(`Movement status changed: ${isMoving ? 'Moving' : 'Stopped'}`);
  }
}

function healPlayer(amount: number): void {
  currentHealth = Math.min(MAX_HEALTH, currentHealth + amount);
  updateHealthDisplay();
}

function updateHealthDisplay(): void {
  const healthContainer = document.getElementById('health-bar-container');
  const healthFill = document.getElementById('health-bar-fill');
  const healthText = document.getElementById('health-text');
  const speedText = document.getElementById('speed-text');
  
  if (!healthContainer || !healthFill || !healthText || !speedText) return;
  
  // Update player ID display
  updatePlayerIdDisplay();
  
  // Show health bar during gameplay
  if (controls && controls.isLocked && !isGameOver) {
    healthContainer.style.display = 'block';
  } else {
    healthContainer.style.display = 'none';
    return;
  }
  
  // Update width and text
  const healthPercentage = (currentHealth / MAX_HEALTH) * 100;
  healthFill.style.width = `${healthPercentage}%`;
  healthText.textContent = `${Math.round(currentHealth)}/${MAX_HEALTH}`;
  
  // Calculate and display movement speed
  const healthSpeedMultiplier = Math.max(
    MIN_MOVEMENT_SPEED_MULTIPLIER, 
    MIN_MOVEMENT_SPEED_MULTIPLIER + ((healthPercentage / 100) * (MAX_MOVEMENT_SPEED_MULTIPLIER - MIN_MOVEMENT_SPEED_MULTIPLIER))
  );
  const speedPercentage = Math.round(healthSpeedMultiplier * 100);
  speedText.textContent = `Movement: ${speedPercentage}%`;
  
  // Update speed text color based on speed reduction
  if (speedPercentage <= SPEED_REDUCTION_SEVERITY_THRESHOLD) {
    speedText.style.color = '#ff8888'; // Red for severely reduced speed
  } else if (speedPercentage <= SPEED_REDUCTION_WARNING_THRESHOLD) {
    speedText.style.color = '#ffff88'; // Yellow for moderately reduced speed
  } else {
    speedText.style.color = '#88ff88'; // Green for normal speed
  }
  
  // Update color based on health level
  healthFill.className = ''; // Clear existing classes
  
  if (currentHealth <= 20) {
    healthFill.classList.add('health-critical');
  } else if (currentHealth <= 40) {
    healthFill.classList.add('health-low');
  } else if (currentHealth <= 70) {
    healthFill.classList.add('health-medium');
  } else {
    healthFill.classList.add('health-high');
  }
}

function updatePlayerIdDisplay(): void {
  // Create or update player ID display
  let playerIdContainer = document.getElementById('player-id-container');
  if (!playerIdContainer) {
    playerIdContainer = document.createElement('div');
    playerIdContainer.id = 'player-id-container';
    playerIdContainer.style.position = 'absolute';
    playerIdContainer.style.top = '80px';
    playerIdContainer.style.left = '20px';
    playerIdContainer.style.color = 'white';
    playerIdContainer.style.fontFamily = 'monospace';
    playerIdContainer.style.fontSize = '14px';
    playerIdContainer.style.background = 'rgba(0, 0, 0, 0.7)';
    playerIdContainer.style.padding = '10px';
    playerIdContainer.style.borderRadius = '5px';
    playerIdContainer.style.zIndex = '1000';
    playerIdContainer.style.pointerEvents = 'none';
    document.body.appendChild(playerIdContainer);
  }
  
  // Show during gameplay only
  if (controls && controls.isLocked && !isGameOver) {
    playerIdContainer.style.display = 'block';
    
    // Update content
    const myId = clientId ? clientId.substring(0, 8) : 'Unknown';
    const connectedIds = getConnectedPlayerIds();
    
    let content = `My ID: ${myId}\n`;
    content += `Connected Players: ${connectedIds.length}\n`;
    
    connectedIds.forEach((id, index) => {
      const shortId = id.substring(0, 8);
      content += `Player ${index + 1}: ${shortId}\n`;
    });
    
    playerIdContainer.textContent = content;
  } else {
    playerIdContainer.style.display = 'none';
  }
}

function updateHealthRegeneration(deltaTime: number): void {
  const currentTime = performance.now();
  const timeSinceLastDamage = currentTime - lastDamageTime;
  const timeSinceLastMovement = currentTime - lastMovementTime;
  
  // Only process health changes if player is injured
  if (currentHealth < MAX_HEALTH && currentHealth > 0) {
    
    // If moving and injured, lose health
    if (isMoving) {
      const healthToLose = MOVEMENT_HEALTH_DRAIN_RATE * deltaTime;
      currentHealth = Math.max(0, currentHealth - healthToLose);
      isRegeneratingHealth = false;
      
      // Update damage time to prevent immediate regeneration
      lastDamageTime = currentTime;
      
      updateHealthDisplay();
      
      // Check for death from movement drain
      if (currentHealth <= 0) {
        console.log("Player died from movement while injured");
        // Handle death the same way as damage death
        if (gameMode === 'multiplayer') {
          // In multiplayer, this counts as a death
          myDeaths++;
          if (dataChannel && dataChannel.readyState === 'open') {
            sendGameEventToOtherPlayers({ 
                type: 'i_was_defeated',
                data: { defeatedPlayerId: clientId || 'unknown' } as GameEventDefeatedData
            });
          }
          
          
          if (checkDefeatCondition()) {
            handleGameOver(false); 
          } else {
            currentHealth = MAX_HEALTH;
            triggerRespawn();
          }
        } else {
          handleGameOver(false);
        }
        return;
      }
    }
    
    // Start regenerating 5 seconds after last damage AND last movement
    const timeSinceLastActivity = Math.max(timeSinceLastDamage, timeSinceLastMovement);
    if (timeSinceLastActivity > HEALTH_REGEN_DELAY && !isMoving) {
      if (!isRegeneratingHealth) {
        isRegeneratingHealth = true;
        console.log("Health regeneration started");
      }
      
      // Regenerate health
      const healthToRestore = HEALTH_REGEN_RATE * deltaTime;
      currentHealth = Math.min(MAX_HEALTH, currentHealth + healthToRestore);
      
      updateHealthDisplay();
      
      // Stop regeneration when full health is reached
      if (currentHealth >= MAX_HEALTH) {
        isRegeneratingHealth = false;
        console.log("Health fully regenerated");
      }
    } else {
      // Not ready to regenerate yet
      isRegeneratingHealth = false;
    }
  } else {
    // At full health or dead
    isRegeneratingHealth = false;
  }
}

function onKeyDown(event: KeyboardEvent) { 
  if (!controls || !controls.isLocked || isGameOver) return;
  switch (event.code) {
    case 'KeyW': case 'ArrowUp': 
      if (isOnBike) {
        queueInput(() => bikeAccelerateActual = true);
      } else {
        queueInput(() => moveForwardActual = true);
      }
      break;
    case 'KeyA': case 'ArrowLeft': 
      if (isOnBike) {
        queueInput(() => bikeTurnLeftActual = true);
      } else {
        queueInput(() => moveLeftActual = true);
      }
      break;
    case 'KeyS': case 'ArrowDown': 
      if (isOnBike) {
        queueInput(() => bikeDecelerateActual = true);
      } else {
        queueInput(() => moveBackwardActual = true);
      }
      break;
    case 'KeyD': case 'ArrowRight': 
      if (isOnBike) {
        queueInput(() => bikeTurnRightActual = true);
      } else {
        queueInput(() => moveRightActual = true);
      }
      break;
    case 'ShiftLeft': queueInput(() => isAimingWithKeyActual = true); break;
    case 'Space': queueInput(() => jump()); break; // Jump with spacebar
    case 'Digit1': queueInput(() => equipWeapon('handgun')); break;
    case 'Digit2': queueInput(() => equipWeapon('sniper')); break;
    case 'Digit3': queueInput(() => equipWeapon('smg')); break;
    case 'KeyR': queueInput(() => startReload()); break;
    case 'KeyB': // B key to cycle scope zoom (sniper only)
      if (currentEquippedWeapon === 'sniper') queueInput(() => cycleScopeZoom()); 
      break;
    case 'PageUp': queueInput(() => adjustZeroing(25)); break; // Increase zeroing distance
    case 'PageDown': queueInput(() => adjustZeroing(-25)); break; // Decrease zeroing distance
    case 'KeyV': queueInput(() => toggleBike()); break; // Toggle bike on/off
  }
}
function onKeyUp(event: KeyboardEvent) { 
  if (isGameOver) { 
    if (event.code === 'ShiftLeft') queueInput(() => isAimingWithKeyActual = false);
    return;
  }
  switch (event.code) {
    case 'KeyW': case 'ArrowUp': 
      if (isOnBike) {
        queueInput(() => bikeAccelerateActual = false);
      } else {
        queueInput(() => moveForwardActual = false);
      }
      break;
    case 'KeyA': case 'ArrowLeft': 
      if (isOnBike) {
        queueInput(() => bikeTurnLeftActual = false);
      } else {
        queueInput(() => moveLeftActual = false);
      }
      break;
    case 'KeyS': case 'ArrowDown': 
      if (isOnBike) {
        queueInput(() => bikeDecelerateActual = false);
      } else {
        queueInput(() => moveBackwardActual = false);
      }
      break;
    case 'KeyD': case 'ArrowRight': 
      if (isOnBike) {
        queueInput(() => bikeTurnRightActual = false);
      } else {
        queueInput(() => moveRightActual = false);
      }
      break;
    case 'ShiftLeft': queueInput(() => isAimingWithKeyActual = false); break;
  }
}
function onMouseDown(event: MouseEvent) { 
  if (!controls || !controls.isLocked || isGameOver || !prng) return;
  
  if (event.button === 0) { // Left click
    if (currentEquippedWeapon === 'smg') {
        isFiringSMGActual = true;
        // The first shot will be handled by the animate loop's SMG firing logic
    } else { // Handgun or Sniper - single shot
        const currentTime = performance.now();
        const currentWpnStats = weaponStatsDB[currentEquippedWeapon];
        if (!currentWpnStats || !currentWpnStats.fireRate) return;

        if (currentTime - lastFireTime < currentWpnStats.fireRate) {
            return; 
        }
        // lastFireTime will be updated inside the queued action for these weapons
        
        queueInput(() => {
          if (isGameOver) return; // Re-check in case game ended during input delay
          const actualFireTime = performance.now(); // Use actual fire time after delay
          if (actualFireTime - lastFireTime < currentWpnStats.fireRate!) return;
          lastFireTime = actualFireTime;

          const muzzleWorldPosition = new THREE.Vector3();
          currentWpnStats.muzzlePoint!.getWorldPosition(muzzleWorldPosition);
          
          // Check ammo and reload state before shooting
          if (currentAmmo[currentEquippedWeapon] <= 0 || isReloading) {
            return; // No ammo or reloading, can't shoot
          }
          
          const projectileDirection = new THREE.Vector3();
          camera.getWorldDirection(projectileDirection);

          spawnProjectileInternal(muzzleWorldPosition, projectileDirection.clone(), currentEquippedWeapon);
          
          // Consume ammo
          currentAmmo[currentEquippedWeapon]--;
          
          if (gameMode === 'multiplayer') {
            const shootEventData: GameEventShootData = {
                muzzlePosition: { x: muzzleWorldPosition.x, y: muzzleWorldPosition.y, z: muzzleWorldPosition.z },
                direction: { x: projectileDirection.x, y: projectileDirection.y, z: projectileDirection.z },
                weaponType: currentEquippedWeapon
            };
            sendGameEvent({ type: 'shoot', data: shootEventData });
          }

          if (currentWpnStats.model && !isWeaponRecoiling) {
            isWeaponRecoiling = true; 
            weaponRecoilTime = 0;
          }
        });
    }
  } else if (event.button === 2) { // Right click
    queueInput(() => isAimingWithMouseActual = true);
  }
}
function onMouseUp(event: MouseEvent) { 
  if (isGameOver) { 
      if (event.button === 2) queueInput(() => isAimingWithMouseActual = false);
      // For left mouse up, if SMG was firing, it's already handled by isFiringSMGActual = false in handleGameOver
      // or if controls unlock, it's also handled.
      return;
  }
  if (event.button === 0) { // Left click up
    if (isFiringSMGActual) {
        isFiringSMGActual = false;
    }
  } else if (event.button === 2) { // Right click up
    queueInput(() => isAimingWithMouseActual = false);
  }
}

function spawnProjectileInternal(muzzlePos: THREE.Vector3, projDir: THREE.Vector3, weaponType: 'handgun' | 'sniper' | 'smg') {
  if (!scene || !weaponStatsDB[weaponType] || !camera || !prng) return;

  const stats = weaponStatsDB[weaponType];
  const finalProjDir = projDir.clone(); // Clone to avoid modifying the original direction vector used for P2P

  // Apply spread for SMG
  if (weaponType === 'smg' && stats.spreadAngle && stats.projectileMaterial) {
    const currentIsAimingDownSights = isAimingWithMouseActual || isAimingWithKeyActual;
    const spreadMultiplier = currentIsAimingDownSights && stats.adsSpreadMultiplier !== undefined ? stats.adsSpreadMultiplier : 1.0;
    const currentSpreadConeAngle = stats.spreadAngle * spreadMultiplier;

    if (currentSpreadConeAngle > 0.001) { 
        const camQuaternion = camera.quaternion;
        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camQuaternion);
        const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camQuaternion);

        const angle = prng.next() * 2 * Math.PI;
        const tanHalfAngle = Math.tan(currentSpreadConeAngle / 2);
        // Use prng.next() for radius. sqrt(prng.next()) gives uniform distribution over area, but this is simpler for small angles.
        const randomRadius = prng.next() * tanHalfAngle; 

        const offsetX = Math.cos(angle) * randomRadius;
        const offsetY = Math.sin(angle) * randomRadius;

        finalProjDir.addScaledVector(camRight, offsetX);
        finalProjDir.addScaledVector(camUp, offsetY);
        finalProjDir.normalize();
    }
  }
  
  // Apply zeroing adjustment for sniper rifle
  if (weaponType === 'sniper' && stats.projectileSpeed) {
    const zeroingAngle = calculateZeroingAngle(sniperZeroingDistance, stats.projectileSpeed);
    
    // Apply upward angle adjustment to compensate for bullet drop
    const camQuaternion = camera.quaternion.clone();
    const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camQuaternion);
    
    // Rotate the direction vector upward by the zeroing angle
    finalProjDir.addScaledVector(camUp, Math.sin(zeroingAngle));
    finalProjDir.normalize();
  }

  const projectileMesh = new THREE.Mesh(projectileGeometry, stats.projectileMaterial);
  projectileMesh.castShadow = true;
  projectileMesh.position.copy(muzzlePos);
  
  // Calculate base projectile velocity
  const baseVelocity = finalProjDir.multiplyScalar(stats.projectileSpeed!);
  
  // Add player movement velocity for realistic ballistics
  const playerMovementVelocity = new THREE.Vector3();
  
  if (isOnBike) {
    // Add bike velocity to projectile
    playerMovementVelocity.x = -Math.sin(bikeDirection) * bikeSpeed;
    playerMovementVelocity.z = -Math.cos(bikeDirection) * bikeSpeed;
  } else {
    // Add walking velocity to projectile
    playerMovementVelocity.copy(horizontalVelocity);
  }
  
  // Combine base projectile velocity with player movement
  const finalProjectileVelocity = baseVelocity.add(playerMovementVelocity);
  
  const projectile: Projectile = {
    mesh: projectileMesh,
    velocity: finalProjectileVelocity,
    lifeTime: 0,
    spawnTime: performance.now(),
    weaponType: weaponType,
    distanceTraveled: 0,
    initialPosition: muzzlePos.clone()
  };
  scene.add(projectile.mesh);
  projectiles.push(projectile);
}

const _projectileCollisionRay = new THREE.Ray();
const _projectileIntersectionPoint = new THREE.Vector3();

function updateProjectiles(delta: number) {
  if (!scene) return;

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    
    const oldPosition = p.mesh.position.clone();
    
    // Update distance traveled
    const distanceThisFrame = p.velocity.length() * delta;
    p.distanceTraveled += distanceThisFrame;
    
    // Apply air resistance if weapon has ballistic coefficient
    const weaponStats = weaponStatsDB[p.weaponType];
    if (weaponStats && weaponStats.ballisticCoefficient && weaponStats.airDensity) {
      const currentSpeed = p.velocity.length();
      const newSpeed = calculateVelocityAtDistance(currentSpeed, distanceThisFrame, weaponStats.ballisticCoefficient, weaponStats.airDensity);
      if (currentSpeed > 0) {
        p.velocity.multiplyScalar(newSpeed / currentSpeed);
      }
    }
    
    // Apply gravity to velocity (negative Y direction)
    p.velocity.y -= GRAVITY * delta;
    
    // Update position with modified velocity
    p.mesh.position.addScaledVector(p.velocity, delta);
    p.lifeTime += delta;

    if (p.lifeTime > PROJECTILE_LIFETIME) {
      scene.remove(p.mesh); if(p.mesh.geometry) p.mesh.geometry.dispose();
      projectiles.splice(i, 1);
      continue;
    }
    
    _projectileCollisionRay.origin.copy(oldPosition);
    _projectileCollisionRay.direction.copy(p.mesh.position).sub(oldPosition);
    const projectileSegmentLength = _projectileCollisionRay.direction.length();

    if (projectileSegmentLength >= 0.0001) { 
        _projectileCollisionRay.direction.normalize();
    }
    
    let hitSomething = false;

    // Optimized target collision detection with caching and distance culling
    const projectilePosition = p.mesh.position;
    const maxCheckDistance = 50; // Only check targets within 50 units
    
    for (const [targetId, target] of targetMeshes.entries()) {
        // Distance culling - skip distant targets for performance
        const targetDistance = projectilePosition.distanceTo(target.position);
        if (targetDistance > maxCheckDistance) continue;
        
        // Use cached bounding box instead of calculating each frame
        const expandedTargetBox = targetBoundingBoxCache.get(targetId);
        if (!expandedTargetBox) continue;
        
        let intersectsThisFrame = false;
        if (projectileSegmentLength >= 0.0001) {
            const hitTargetPoint = _projectileCollisionRay.intersectBox(expandedTargetBox, _projectileIntersectionPoint);
            if (hitTargetPoint && oldPosition.distanceTo(hitTargetPoint) <= projectileSegmentLength) {
                intersectsThisFrame = true;
            }
        }
        
        if (intersectsThisFrame || expandedTargetBox.containsPoint(projectilePosition)) {
            scene.remove(target);
            if (target.geometry) target.geometry.dispose();
            if (target.material && !Array.isArray(target.material)) (target.material as THREE.Material).dispose();
            targetMeshes.delete(targetId);
            targetBoundingBoxCache.delete(targetId);
            hitSomething = true;
            break; 
        }
    }

    if (!hitSomething && gameMode === 'multiplayer') { 
        let isHeadshot = false;
        let hitSomethingThisFrame = false;
        let hitPlayerId: string | null = null;
        
        // Check collision with all remote players (both headshots and body hits)
        for (const [playerId, meshes] of remotePlayerMeshes) {
            if (!meshes.mainMesh.visible || hitSomethingThisFrame) continue; // Skip invisible players or if already hit something
            
            // First, check specifically for headshot by testing head mesh
            let headMesh: THREE.Mesh | null = null;
            meshes.mainMesh.traverse((child) => {
                if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
                    headMesh = child;
                }
            });
            
            if (headMesh) {
                // Create bounding box for head only with slight expansion
                const headBoundingBox = new THREE.Box3().setFromObject(headMesh);
                const expandedHeadBox = headBoundingBox.clone().expandByScalar(PLAYER_RADIUS * 0.8); // Smaller expansion for head
                
                // Check ray intersection with head first
                if (projectileSegmentLength >= 0.0001) {
                    const hitHeadPoint = _projectileCollisionRay.intersectBox(expandedHeadBox, _projectileIntersectionPoint);
                    if (hitHeadPoint && oldPosition.distanceTo(hitHeadPoint) <= projectileSegmentLength) {
                        isHeadshot = true;
                        hitSomethingThisFrame = true;
                        hitPlayerId = playerId;
                        break;
                    }
                }
                
                // Check if projectile position is inside head box
                if (!hitSomethingThisFrame && expandedHeadBox.containsPoint(p.mesh.position)) {
                    isHeadshot = true;
                    hitSomethingThisFrame = true;
                    hitPlayerId = playerId;
                    break;
                }
            }
        
            
            // If no headshot on this player, check for body hit on the same player
            if (!hitSomethingThisFrame) {
                const remotePlayerBoundingBox = new THREE.Box3().setFromObject(meshes.mainMesh);
                const expandedRemotePlayerBox = remotePlayerBoundingBox.clone().expandByScalar(PLAYER_RADIUS); 
                
                if (projectileSegmentLength >= 0.0001) {
                    const hitBodyPoint = _projectileCollisionRay.intersectBox(expandedRemotePlayerBox, _projectileIntersectionPoint);
                    if (hitBodyPoint && oldPosition.distanceTo(hitBodyPoint) <= projectileSegmentLength) {
                        hitSomethingThisFrame = true;
                        hitPlayerId = playerId; // Track which player was hit
                    }
                }
                
                if (!hitSomethingThisFrame && expandedRemotePlayerBox.containsPoint(p.mesh.position)) {
                    hitSomethingThisFrame = true;
                    hitPlayerId = playerId; // Track which player was hit
                }
            }
            
            // If we hit this player, exit the loop
            if (hitSomethingThisFrame) break;
        }
            
        if (hitSomethingThisFrame) {
            const weaponStats = weaponStatsDB[p.weaponType];
            if (weaponStats && typeof weaponStats.damage === 'number') {
                // Calculate distance and velocity-based damage
                const projectileSpeed = p.velocity.length();
                const baseSpeed = weaponStats.projectileSpeed || 250; // fallback to handgun speed
                const initialSpeed = baseSpeed; // Use base speed as initial speed
                
                // Use velocity-based damage calculation
                let finalDamage = calculateVelocityBasedDamage(
                    weaponStats.damage, 
                    projectileSpeed, 
                    initialSpeed
                );
                
                // Debug info for velocity-based damage
                if (isHeadshot) {
                    finalDamage *= 5; // Double damage for headshots
                }
                // Send hit event only to the specific player that was hit
                if (hitPlayerId) {
                    sendGameEventToPlayer(hitPlayerId, { 
                        type: 'hit_opponent', 
                        data: { 
                            damageDealt: finalDamage,
                            isHeadshot: isHeadshot,
                            fromPlayerId: clientId || 'unknown',
                        } as GameEventHitOpponentData 
                    });
                console.log(`HitPlayerId: ${hitPlayerId}, Distance: ${p.distanceTraveled.toFixed(1)}m, Speed: ${projectileSpeed.toFixed(1)}/${initialSpeed}, Damage: ${finalDamage.toFixed(1)}`);

                } else {
                    console.warn('Hit detected but no hitPlayerId set');
                }
            } 
            hitSomething = true;
            
            // Visual feedback - different colors for headshots
            remotePlayerMesh.traverse(child => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    const originalColor = (child.material as THREE.MeshStandardMaterial).color.getHex();
                    const hitColor = isHeadshot ? 0xffff00 : 0xff0000; // Yellow for headshot, red for body
                    (child.material as THREE.MeshStandardMaterial).color.setHex(hitColor); 
                    setTimeout(() => {
                        if(child && child.material instanceof THREE.MeshStandardMaterial) { 
                            (child.material as THREE.MeshStandardMaterial).color.setHex(originalColor);
                        }
                    }, 150);
                }
            });
            
            // Debug output for testing
            
        }
    }
    
    // Check collision with bike if target is on bike
    if (!hitSomething && gameMode === 'multiplayer' && remotePlayerBikeModel && remotePlayerBikeModel.parent) {
        const bikeBoundingBox = new THREE.Box3().setFromObject(remotePlayerBikeModel);
        const expandedBikeBox = bikeBoundingBox.clone().expandByScalar(0.5); // Expand for easier targeting
        
        let bikeTakeDamage = false;
        if (projectileSegmentLength >= 0.0001) {
            const hitBikePoint = _projectileCollisionRay.intersectBox(expandedBikeBox, _projectileIntersectionPoint);
            if (hitBikePoint && oldPosition.distanceTo(hitBikePoint) <= projectileSegmentLength) {
                bikeTakeDamage = true;
            }
        }
        
        if (bikeTakeDamage || expandedBikeBox.containsPoint(p.mesh.position)) {
            const weaponStats = weaponStatsDB[p.weaponType];
            if (weaponStats && typeof weaponStats.damage === 'number') {
                // Calculate bike damage (similar to player damage calculation)
                let bikeDamage = calculateVelocityBasedDamage(
                    weaponStats.damage, 
                    p.velocity.length(), 
                    weaponStats.projectileSpeed || 250
                );
                
                console.log(`Hit remote bike for ${bikeDamage} damage`);
                
                // Send bike hit event to remote player
                sendGameEvent({
                    type: 'bike_hit',
                    data: {
                        damageDealt: bikeDamage
                    } as GameEventBikeHitData
                });
                
                // Visual feedback for bike hit
                remotePlayerBikeModel.traverse((child: any) => {
                    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                        const originalColor = child.material.color.getHex();
                        child.material.color.setHex(0xff8800); // Orange for bike damage
                        setTimeout(() => {
                            if (child && child.material instanceof THREE.MeshStandardMaterial) {
                                child.material.color.setHex(originalColor);
                            }
                        }, 200);
                    }
                });
            }
            hitSomething = true;
        }
    }
    
    // Check collision with zombies (single player only)
    if (!hitSomething && gameMode === 'singleplayer') {
        for (const zombie of zombies) {
            if (!zombie.isAlive) continue;
            
            let isHeadshot = false;
            let hitZombie = false;
            
            // First, check specifically for headshot by testing head mesh
            let headMesh: THREE.Mesh | null = null;
            zombie.mesh.traverse((child) => {
                if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry && child.position.y > 1.8) {
                    headMesh = child;
                }
            });
            
            if (headMesh) {
                // Create bounding box for head only with slight expansion
                const headBoundingBox = new THREE.Box3().setFromObject(headMesh);
                const expandedHeadBox = headBoundingBox.clone().expandByScalar(0.1);
                
                // Check ray intersection with head first
                if (projectileSegmentLength >= 0.0001) {
                    const hitHeadPoint = _projectileCollisionRay.intersectBox(expandedHeadBox, _projectileIntersectionPoint);
                    if (hitHeadPoint && oldPosition.distanceTo(hitHeadPoint) <= projectileSegmentLength) {
                        isHeadshot = true;
                        hitZombie = true;
                    }
                }
                
                // Check point containment for head
                if (!hitZombie && expandedHeadBox.containsPoint(p.mesh.position)) {
                    isHeadshot = true;
                    hitZombie = true;
                }
            }
            
            // If not a headshot, check for body hit
            if (!hitZombie) {
                const zombieBoundingBox = new THREE.Box3().setFromObject(zombie.mesh);
                const expandedZombieBox = zombieBoundingBox.clone().expandByScalar(0.2);
                
                let intersectsThisFrame = false;
                if (projectileSegmentLength >= 0.0001) {
                    const hitZombiePoint = _projectileCollisionRay.intersectBox(expandedZombieBox, _projectileIntersectionPoint);
                    if (hitZombiePoint && oldPosition.distanceTo(hitZombiePoint) <= projectileSegmentLength) {
                        intersectsThisFrame = true;
                    }
                }
                
                if (intersectsThisFrame || expandedZombieBox.containsPoint(p.mesh.position)) {
                    hitZombie = true;
                }
            }
            
            if (hitZombie) {
                const weaponStats = weaponStatsDB[p.weaponType];
                if (weaponStats && typeof weaponStats.damage === 'number') {
                    let damage = Math.floor(weaponStats.damage * weaponDamageMultiplier);
                    
                    // Apply headshot multiplier (5x damage like multiplayer)
                    if (isHeadshot) {
                        damage *= 5;
                    }
                    
                    damageZombie(zombie.id, damage, isHeadshot);
                }
                hitSomething = true;
                break;
            }
        }
    }
    
    // Check collision with map features (walls, obstacles, buildings)
    if (!hitSomething) {
        for (const feature of mapFeatures) {
            const featureBoundingBox = new THREE.Box3().setFromObject(feature);
            
            // Expand the bounding box slightly to ensure collision detection
            const expansion = PROJECTILE_RADIUS;
            featureBoundingBox.expandByScalar(expansion);
            
            // Check if projectile intersects with the feature
            let intersectsThisFrame = false;
            if (projectileSegmentLength >= 0.0001) {
                const hitFeaturePoint = _projectileCollisionRay.intersectBox(featureBoundingBox, _projectileIntersectionPoint);
                if (hitFeaturePoint && oldPosition.distanceTo(hitFeaturePoint) <= projectileSegmentLength) {
                    intersectsThisFrame = true;
                }
            }
            
            if (intersectsThisFrame || featureBoundingBox.containsPoint(p.mesh.position)) {
                hitSomething = true;
                break;
            }
        }
    }
    
    // Terrain collision skipped for performance - bullets pass through terrain
    
    // Check collision with ground
    if (!hitSomething && groundMesh) {
        const groundBoundingBox = new THREE.Box3().setFromObject(groundMesh);
        
        // Check if projectile hits the ground
        let intersectsGround = false;
        if (projectileSegmentLength >= 0.0001) {
            const hitGroundPoint = _projectileCollisionRay.intersectBox(groundBoundingBox, _projectileIntersectionPoint);
            if (hitGroundPoint && oldPosition.distanceTo(hitGroundPoint) <= projectileSegmentLength) {
                intersectsGround = true;
            }
        }
        
        if (intersectsGround || groundBoundingBox.containsPoint(p.mesh.position)) {
            hitSomething = true;
        }
    }

    if (hitSomething) {
        scene.remove(p.mesh); if(p.mesh.geometry) p.mesh.geometry.dispose();
        projectiles.splice(i, 1);
    }
  }
}

function updateRemoteProjectiles(delta: number) {
    if (!scene) return;
    for (let i = remoteProjectiles.length - 1; i >= 0; i--) {
        const p = remoteProjectiles[i];
        
        const oldPosition = p.mesh.position.clone();
        
        // Update distance traveled for remote projectiles
        const distanceThisFrame = p.velocity.length() * delta;
        p.distanceTraveled += distanceThisFrame;
        
        // Apply air resistance if weapon has ballistic coefficient
        const weaponStats = weaponStatsDB[p.weaponType];
        if (weaponStats && weaponStats.ballisticCoefficient && weaponStats.airDensity) {
          const currentSpeed = p.velocity.length();
          const newSpeed = calculateVelocityAtDistance(currentSpeed, distanceThisFrame, weaponStats.ballisticCoefficient, weaponStats.airDensity);
          if (currentSpeed > 0) {
            p.velocity.multiplyScalar(newSpeed / currentSpeed);
          }
        }
        
        // Apply gravity to remote projectiles as well
        p.velocity.y -= GRAVITY * delta;
        
        p.mesh.position.addScaledVector(p.velocity, delta);
        p.lifeTime += delta;

        if (p.lifeTime > PROJECTILE_LIFETIME) {
            scene.remove(p.mesh); if(p.mesh.geometry) p.mesh.geometry.dispose();
            remoteProjectiles.splice(i, 1);
            continue;
        }
        
        // Check collision with map features for remote projectiles
        let hitSomething = false;
        
        // Setup collision ray
        _projectileCollisionRay.origin.copy(oldPosition);
        _projectileCollisionRay.direction.copy(p.mesh.position).sub(oldPosition);
        const projectileSegmentLength = _projectileCollisionRay.direction.length();
        
        if (projectileSegmentLength >= 0.0001) {
            _projectileCollisionRay.direction.normalize();
        }
        
        // Check collision with map features
        for (const feature of mapFeatures) {
            const featureBoundingBox = new THREE.Box3().setFromObject(feature);
            featureBoundingBox.expandByScalar(PROJECTILE_RADIUS);
            
            let intersectsThisFrame = false;
            if (projectileSegmentLength >= 0.0001) {
                const hitFeaturePoint = _projectileCollisionRay.intersectBox(featureBoundingBox, _projectileIntersectionPoint);
                if (hitFeaturePoint && oldPosition.distanceTo(hitFeaturePoint) <= projectileSegmentLength) {
                    intersectsThisFrame = true;
                }
            }
            
            if (intersectsThisFrame || featureBoundingBox.containsPoint(p.mesh.position)) {
                hitSomething = true;
                break;
            }
        }
        
        // Check collision with ground
        if (!hitSomething && groundMesh) {
            const groundBoundingBox = new THREE.Box3().setFromObject(groundMesh);
            
            let intersectsGround = false;
            if (projectileSegmentLength >= 0.0001) {
                const hitGroundPoint = _projectileCollisionRay.intersectBox(groundBoundingBox, _projectileIntersectionPoint);
                if (hitGroundPoint && oldPosition.distanceTo(hitGroundPoint) <= projectileSegmentLength) {
                    intersectsGround = true;
                }
            }
            
            if (intersectsGround || groundBoundingBox.containsPoint(p.mesh.position)) {
                hitSomething = true;
            }
        }
        
        // Note: Remote projectiles are visual only. 
        // Actual hit detection and damage is handled by the opponent's client
        // and communicated via hit_opponent events.
        
        if (hitSomething) {
            scene.remove(p.mesh); if(p.mesh.geometry) p.mesh.geometry.dispose();
            remoteProjectiles.splice(i, 1);
        }
    }
}


function updateWeaponDynamics(delta: number) { 
  if (!camera || !weaponStatsDB[currentEquippedWeapon] || !scopeOverlay || !handgunModel || !sniperRifleModel || !smgModel || !prng) return;

  const stats = weaponStatsDB[currentEquippedWeapon];
  const weaponModel = stats.model!;
  const currentIsAimingDownSights = isAimingWithMouseActual || isAimingWithKeyActual;

  // Use variable zoom for sniper rifle, fixed FOV for others
  let targetFOV: number;
  if (currentIsAimingDownSights) {
    if (currentEquippedWeapon === 'sniper') {
      targetFOV = getCurrentScopeFOV();
    } else {
      targetFOV = stats.adsFov!;
    }
  } else {
    targetFOV = NORMAL_FOV;
  }
  camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, ADS_TRANSITION_SPEED * delta);
  camera.updateProjectionMatrix();

  const sniperScopeObject = sniperRifleModel.getObjectByName("sniperScopeMesh") as THREE.Mesh | undefined;

  if (currentEquippedWeapon === 'sniper') {
    scopeOverlay.style.display = currentIsAimingDownSights ? 'block' : 'none';
    if (sniperScopeObject && sniperRifleModel.visible) {
        sniperScopeObject.visible = !currentIsAimingDownSights;
    }
  } else { 
    scopeOverlay.style.display = 'none';
  }

  if (isWeaponRecoiling) {
    weaponRecoilTime += delta;
    let targetCameraPitchValue = 0;
    const targetWeaponOffsetValue = new THREE.Vector3();

    if (weaponRecoilTime <= stats.recoilDuration!) { 
        targetWeaponOffsetValue.x = (prng.next() - 0.5) * 2 * (stats.recoilAmount!.x || 0); 
        targetWeaponOffsetValue.z = stats.recoilAmount!.z;

        if (currentEquippedWeapon === 'sniper' && currentIsAimingDownSights) {
            targetCameraPitchValue = stats.recoilAmount!.y; 
        } else { 
            targetWeaponOffsetValue.y = stats.recoilAmount!.y; 
            let defaultPitchKick = 0.015;
            if (currentEquippedWeapon === 'sniper') defaultPitchKick = 0.020;
            else if (currentEquippedWeapon === 'smg') defaultPitchKick = 0.025; // Slightly more pitch kick for SMG hip/non-ADS sniper
            targetCameraPitchValue = defaultPitchKick; 
        }
    } 

    const lerpSpeedFactor = stats.recoilReturnSpeed! * delta;
    const actualLerpFactor = (weaponRecoilTime <= stats.recoilDuration!) ? lerpSpeedFactor * 2.5 : lerpSpeedFactor * 1.5;

    cameraPitchRecoil = THREE.MathUtils.lerp(cameraPitchRecoil, targetCameraPitchValue, actualLerpFactor);
    activeWeaponRecoilOffset.lerp(targetWeaponOffsetValue, actualLerpFactor);
    
    if (weaponRecoilTime > stats.recoilDuration!) {
        const isPitchSettled = Math.abs(cameraPitchRecoil) < 0.001 && Math.abs(targetCameraPitchValue) < 0.001;
        const isOffsetSettled = activeWeaponRecoilOffset.lengthSq() < 0.00001 && targetWeaponOffsetValue.lengthSq() < 0.00001;

        if (isPitchSettled && isOffsetSettled) {
            isWeaponRecoiling = false;
            weaponRecoilTime = 0;
            cameraPitchRecoil = 0;
            activeWeaponRecoilOffset.set(0,0,0);
        }
    }
  } else { 
      cameraPitchRecoil = THREE.MathUtils.lerp(cameraPitchRecoil, 0, stats.recoilReturnSpeed! * delta * 1.5); 
      activeWeaponRecoilOffset.lerp(new THREE.Vector3(0,0,0), stats.recoilReturnSpeed! * delta * 1.5); 
  }

  const baseTargetPosition = currentIsAimingDownSights ? stats.adsPosition! : stats.hipPosition!;
  const baseTargetRotation = currentIsAimingDownSights ? stats.adsRotation! : stats.hipRotation!;

  weaponModel.position.lerp(baseTargetPosition, ADS_TRANSITION_SPEED * delta);
  weaponModel.rotation.x = THREE.MathUtils.lerp(weaponModel.rotation.x, baseTargetRotation.x, ADS_TRANSITION_SPEED * delta);
  weaponModel.rotation.y = THREE.MathUtils.lerp(weaponModel.rotation.y, baseTargetRotation.y, ADS_TRANSITION_SPEED * delta);
  weaponModel.rotation.z = THREE.MathUtils.lerp(weaponModel.rotation.z, baseTargetRotation.z, ADS_TRANSITION_SPEED * delta);

  if (currentEquippedWeapon === 'sniper' && currentIsAimingDownSights) {
    weaponModel.rotation.x += cameraPitchRecoil; 
    weaponModel.position.x -= activeWeaponRecoilOffset.x; 
    weaponModel.position.z -= activeWeaponRecoilOffset.z; 
  } else {
    weaponModel.position.x -= activeWeaponRecoilOffset.x;
    weaponModel.position.y -= activeWeaponRecoilOffset.y; 
    weaponModel.position.z -= activeWeaponRecoilOffset.z; 
  }
  
  // RELOAD ANIMATION
  if (isReloading && stats.reloadTime) {
    weaponReloadTime += delta;
    const reloadProgress = Math.min(weaponReloadTime / (stats.reloadTime / 1000), 1.0);
    
    // Create smooth reload motion curve
    const reloadCurve = Math.sin(reloadProgress * Math.PI);
    const downwardCurve = Math.sin(reloadProgress * Math.PI * 2) * 0.5; // Double frequency for down-up motion
    
    weaponReloadOffset.y = -0.25 * reloadCurve; // Move weapon down
    weaponReloadOffset.z = 0.15 * downwardCurve; // Move weapon back and forth
    weaponReloadOffset.x = Math.sin(reloadProgress * Math.PI * 3) * 0.05; // Slight side wobble
    
    weaponModel.position.add(weaponReloadOffset);
  } else if (!isReloading) {
    weaponReloadTime = 0;
    weaponReloadOffset.set(0, 0, 0);
  }
}


function processPendingInputs() { 
  const currentTime = performance.now();
  let i = 0;
  while (i < pendingInputs.length) {
    if (currentTime >= pendingInputs[i].timestamp + INPUT_DELAY_MS) {
      pendingInputs[i].action();
      pendingInputs.splice(i, 1);
    } else {
      i++;
    }
  }
}

const playerCollider = new THREE.Box3();

function animate() {
  if (!isGameInitialized || !renderer || !scene || !camera || !controls) {
     if (gameMode === 'idle' && isGameInitialized && (!mainMenuDiv?.style.display || mainMenuDiv?.style.display === 'flex')) {
        if(peerConnection && !isGameOver) resetP2PState();
        return;
     }
    requestAnimationFrame(animate);
    return;
  }
  requestAnimationFrame(animate);

  if (isGameOver) {
      renderer.render(scene, camera);
      return;
  }

  const time = performance.now();
  const delta = controls.isLocked ? Math.min((time - prevTime) / 1000, 0.05) : 0;
  prevTime = time;


  if (controls.isLocked) {
    processPendingInputs();

    // Adjust mouse sensitivity based on scope zoom
    controls.sensitivity = 0.002 * mouseSensitivity * getMouseSensitivityMultiplier();

    // SMG Full Auto Fire Logic
    if (isFiringSMGActual && currentEquippedWeapon === 'smg' && !isGameOver && prng) {
        const smgStats = weaponStatsDB.smg;
        if (smgStats && smgStats.fireRate && (time - lastFireTime >= smgStats.fireRate)) {
            lastFireTime = time;

            const muzzleWorldPosition = new THREE.Vector3();
            smgStats.muzzlePoint!.getWorldPosition(muzzleWorldPosition);
            
            // Check ammo and reload state before shooting
            if (currentAmmo['smg'] <= 0 || isReloading) {
                isFiringSMGActual = false; // Stop auto-fire when out of ammo or reloading
                return;
            }
            
            const projectileDirection = new THREE.Vector3();
            camera.getWorldDirection(projectileDirection);

            spawnProjectileInternal(muzzleWorldPosition, projectileDirection.clone(), 'smg');
            
            // Consume ammo
            currentAmmo['smg']--;
            
            if (gameMode === 'multiplayer') {
                const shootEventData: GameEventShootData = {
                    muzzlePosition: { x: muzzleWorldPosition.x, y: muzzleWorldPosition.y, z: muzzleWorldPosition.z },
                    direction: { x: projectileDirection.x, y: projectileDirection.y, z: projectileDirection.z },
                    weaponType: 'smg'
                };
                sendGameEvent({ type: 'shoot', data: shootEventData });
            }

            if (smgStats.model && !isWeaponRecoiling) {
                isWeaponRecoiling = true; 
                weaponRecoilTime = 0;
            }
        }
    }
    
    // Handle reload timing
    if (isReloading) {
        const currentWeaponStats = weaponStatsDB[currentEquippedWeapon];
        if (currentWeaponStats && currentWeaponStats.reloadTime) {
            if (time - reloadStartTime >= currentWeaponStats.reloadTime) {
                // Reload complete
                currentAmmo[currentEquippedWeapon] = currentWeaponStats.magazineCapacity || 0;
                isReloading = false;
                weaponReloadTime = 0; // Reset reload animation timer
                weaponReloadOffset.set(0, 0, 0); // Reset reload animation offset
            }
        }
    }

    const playerObject = controls.getObject(); 
    // Calculate health-based speed multiplier
    const healthPercentage = currentHealth / MAX_HEALTH;
    // Speed ranges from MIN_MOVEMENT_SPEED_MULTIPLIER at 0 health to MAX_MOVEMENT_SPEED_MULTIPLIER at full health
    const healthSpeedMultiplier = MIN_MOVEMENT_SPEED_MULTIPLIER + (healthPercentage * (MAX_MOVEMENT_SPEED_MULTIPLIER - MIN_MOVEMENT_SPEED_MULTIPLIER));
    
    const aimingMultiplier = (isAimingWithKeyActual || isAimingWithMouseActual) ? AIMING_SPEED_MULTIPLIER : 1.0;
    const currentSpeed = MOVEMENT_SPEED * aimingMultiplier * healthSpeedMultiplier;
    
    // Movement physics
    if (isOnBike) {
        // Realistic bike physics: Force-based acceleration
        let engineForce = 0;
        
        if (bikeAccelerateActual) {
            // Apply engine power (forward force)
            engineForce = bikeEnginePower;
        } else if (bikeDecelerateActual) {
            // Apply braking force (backward force)
            engineForce = -bikeBrakingForce;
        }
        
        // Calculate air resistance (increases with speed squared)
        const airDrag = bikeAirDragCoefficient * bikeSpeed * Math.abs(bikeSpeed);
        
        // Calculate rolling resistance (proportional to speed)
        const rollingDrag = bikeRollingResistance * bikeSpeed;
        
        // Calculate net force (engine force minus all resistances)
        const netForce = engineForce - airDrag - rollingDrag;
        
        // Calculate acceleration using F = ma
        const acceleration = netForce / bikeMass;
        
        // Update speed (no artificial speed limits!)
        bikeSpeed += acceleration * delta;
        
        // Only limit reverse speed for gameplay reasons
        if (bikeSpeed < -15.0) {
            bikeSpeed = -15.0; // Reasonable reverse speed limit
        }
        
        // Bike banking physics (lean into turns like a real bike)
        const cameraObject = controls.getObject();
        
        // Set target bank angle based on input (original direction)
        if (bikeTurnLeftActual) {
            targetBankAngle = maxBankAngle; // Lean right (into left turn)
        } else if (bikeTurnRightActual) {
            targetBankAngle = -maxBankAngle; // Lean left (into right turn)
        } else {
            targetBankAngle = 0; // Return to upright
        }
        
        // Smoothly interpolate current bank angle towards target
        const bankDelta = targetBankAngle - bikeBankAngle;
        const currentBankSpeed = (targetBankAngle === 0) ? bankReturnSpeed : bankSpeed;
        bikeBankAngle += Math.sign(bankDelta) * Math.min(Math.abs(bankDelta), currentBankSpeed * delta);
        
        // Calculate turn rate based on bank angle and speed (improved responsiveness)
        const theoreticalMaxSpeed = calculateTheoreticalMaxSpeed();
        const speedFactor = Math.abs(bikeSpeed) / theoreticalMaxSpeed; // 0 to 1
        // Ensure minimum turning capability even at low speeds
        const minTurnRate = 0.3; // Minimum 30% turning ability at any speed
        const adjustedSpeedFactor = Math.max(minTurnRate, speedFactor);
        const turnRate = (bikeBankAngle * adjustedSpeedFactor * bikeTurnSpeed) / maxBankAngle;
        
        // Apply turning based on bank angle and speed (allow turning even at very low speeds)
        if (Math.abs(bikeSpeed) > 0.01) {
            const actualTurnAmount = turnRate * delta;
            bikeDirection += actualTurnAmount;
            
            // Rotate camera to maintain relative position during turn
            cameraObject.rotateY(actualTurnAmount);
        }
        
        // Move bike in its own direction (independent of camera)
        const moveDistance = bikeSpeed * delta;
        const bikeVelocity = new THREE.Vector3();
        bikeVelocity.x = -Math.sin(bikeDirection) * moveDistance;
        bikeVelocity.z = -Math.cos(bikeDirection) * moveDistance;
        
        // Update bike position
        bikePosition.add(bikeVelocity);
        
        // Get terrain height at bike position for proper ground following
        const terrainHeight = getTerrainHeightAt(bikePosition.x, bikePosition.z);
        bikePosition.y = terrainHeight - PLAYER_HEIGHT; // Subtract player height to get actual ground level
        
        // Update player position to match bike (seated position)
        playerObject.position.copy(bikePosition);
        playerObject.position.y += 2.3; // Raise player to seat height (1.0m above bike center)
        
        // Apply bank angle using a simpler approach that preserves camera control
        // Store current camera rotations
        const currentPitch = cameraObject.rotation.x;
        const currentYaw = cameraObject.rotation.y;
        
        // Apply the banking by setting rotations in the correct order
        cameraObject.rotation.order = 'YXZ'; // Yaw, then Pitch, then Roll
        cameraObject.rotation.set(currentPitch, currentYaw, bikeBankAngle);
        
        // Update bike model position and rotation (follows bike direction with banking)
        if (bikeModel && bikeModel.visible) {
            bikeModel.position.copy(bikePosition);
            bikeModel.position.y += 0.5; // Raise bike by wheel radius to sit on ground properly
            bikeModel.rotation.y = bikeDirection;
            bikeModel.rotation.z = bikeBankAngle; // Bike leans into turns
        }
        
        // Check for bike collisions
        checkBikeCollisions();
    } else {
        // Calculate input direction in world space (only for walking)
        direction.z = Number(moveForwardActual) - Number(moveBackwardActual);
        direction.x = Number(moveLeftActual) - Number(moveRightActual);
        direction.normalize();
        
        // Apply different physics for ground vs air movement
        if (isOnGround) {
        // Ground movement: direct control with friction
        const groundFriction = 8.0;
        horizontalVelocity.x -= horizontalVelocity.x * groundFriction * delta;
        horizontalVelocity.z -= horizontalVelocity.z * groundFriction * delta;
        
        // Add input acceleration
        if (moveForwardActual || moveBackwardActual) {
            horizontalVelocity.z -= direction.z * currentSpeed * 12.0 * delta;
        }
        if (moveLeftActual || moveRightActual) {
            horizontalVelocity.x -= direction.x * currentSpeed * 12.0 * delta;
        }
        } else {
            // Air movement: limited control with momentum preservation
        const airControl = 0.3; // Reduced air control
        const airFriction = 2.0; // Less friction in air
        
            horizontalVelocity.x -= horizontalVelocity.x * airFriction * delta;
            horizontalVelocity.z -= horizontalVelocity.z * airFriction * delta;
            
            // Limited air control
            if (moveForwardActual || moveBackwardActual) {
                horizontalVelocity.z -= direction.z * currentSpeed * airControl * 12.0 * delta;
            }
            if (moveLeftActual || moveRightActual) {
                horizontalVelocity.x -= direction.x * currentSpeed * airControl * 12.0 * delta;
            }
        }
    }
    
    // Cap maximum horizontal speed (applies to both walking and bike modes)
    if (!isOnBike) {
    const maxSpeed = currentSpeed * 1.2;
    const currentHorizontalSpeed = Math.sqrt(horizontalVelocity.x * horizontalVelocity.x + horizontalVelocity.z * horizontalVelocity.z);
    if (currentHorizontalSpeed > maxSpeed) {
        horizontalVelocity.x = (horizontalVelocity.x / currentHorizontalSpeed) * maxSpeed;
        horizontalVelocity.z = (horizontalVelocity.z / currentHorizontalSpeed) * maxSpeed;
    }
    
    const intendedMove = new THREE.Vector3();
    intendedMove.x = horizontalVelocity.x * delta; 
    intendedMove.z = horizontalVelocity.z * delta;
    const originalPosition = playerObject.position.clone();
    
    // Use enhanced slope-aware movement for mountain maps
    if (currentMapType === MapType.MOUNTAIN && (intendedMove.x !== 0 || intendedMove.z !== 0)) {
        const moveResult = checkSlopeMovement(originalPosition, intendedMove);
        
        if (!moveResult.canMove) {
            // Movement blocked by steep slope - stop horizontal movement
            horizontalVelocity.x = 0;
            horizontalVelocity.z = 0;
        } else if (moveResult.adjustedPos) {
            // Step-up detected - move to adjusted position
            playerObject.position.copy(moveResult.adjustedPos);
        } else {
            // Normal movement allowed - use standard collision detection
            playerObject.translateX(intendedMove.x);
            playerObject.translateZ(intendedMove.z);
        }
    } else {
        // Non-mountain maps use standard movement
        // Try X movement first
        playerObject.translateX(intendedMove.x);
    }
    
    // Apply collision detection only for non-mountain maps or if using standard movement
    if (currentMapType !== MapType.MOUNTAIN || (intendedMove.x === 0 && intendedMove.z === 0)) {
        playerCollider.setFromCenterAndSize( new THREE.Vector3(playerObject.position.x, originalPosition.y - PLAYER_HEIGHT / 2 + PLAYER_RADIUS, playerObject.position.z), new THREE.Vector3(PLAYER_RADIUS * 2, PLAYER_HEIGHT - PLAYER_RADIUS*2 , PLAYER_RADIUS * 2) );
        // Check collision with regular map features
        for (const feature of mapFeatures) { 
            const featureBox = new THREE.Box3().setFromObject(feature); 
            if (playerCollider.intersectsBox(featureBox)) { 
                playerObject.position.x = originalPosition.x; 
                horizontalVelocity.x = 0; 
                break; 
            } 
        }
    }
    
    // Z movement only for non-mountain maps (mountain maps handle both X and Z together)
    if (currentMapType !== MapType.MOUNTAIN) {
        // Try Z movement
        playerObject.translateZ(intendedMove.z);
        playerCollider.setFromCenterAndSize( new THREE.Vector3(playerObject.position.x, originalPosition.y - PLAYER_HEIGHT / 2 + PLAYER_RADIUS, playerObject.position.z), new THREE.Vector3(PLAYER_RADIUS * 2, PLAYER_HEIGHT- PLAYER_RADIUS*2, PLAYER_RADIUS * 2) );
        // Check collision with regular map features
        for (const feature of mapFeatures) { 
            const featureBox = new THREE.Box3().setFromObject(feature); 
            if (playerCollider.intersectsBox(featureBox)) { 
                playerObject.position.z = originalPosition.z; 
                horizontalVelocity.z = 0; 
                break; 
            } 
        }
    }
    
    // Final combined movement check to prevent corner clipping (non-mountain maps only)
    if (currentMapType !== MapType.MOUNTAIN) {
        const finalCollider = new THREE.Box3().setFromCenterAndSize(
            new THREE.Vector3(playerObject.position.x, originalPosition.y - PLAYER_HEIGHT / 2 + PLAYER_RADIUS, playerObject.position.z),
            new THREE.Vector3(PLAYER_RADIUS * 2, PLAYER_HEIGHT - PLAYER_RADIUS * 2, PLAYER_RADIUS * 2)
        );
        
        for (const feature of mapFeatures) {
            const featureBox = new THREE.Box3().setFromObject(feature);
            if (finalCollider.intersectsBox(featureBox)) {
                // Revert to original position if final position causes collision
                playerObject.position.x = originalPosition.x;
                playerObject.position.z = originalPosition.z;
                horizontalVelocity.x = 0;
                horizontalVelocity.z = 0;
                break;
            }
        }
    }
    const rayOrigin = playerObject.position.clone(); rayOrigin.y += PLAYER_HEIGHT * 0.5;
    const rayDirection = new THREE.Vector3(0, -1, 0);
    const groundRaycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, PLAYER_HEIGHT * 2);
    // Collect all meshes for collision detection, including terrain children
    const allCollidableObjects: THREE.Object3D[] = [groundMesh];
    
    // Add regular map features
    mapFeatures.forEach(f => {
        const featureBox = new THREE.Box3().setFromObject(f);
        if (featureBox.max.y < rayOrigin.y + PLAYER_HEIGHT * 0.5) {
            allCollidableObjects.push(f);
        }
    });
    
    // For mountain maps, add cached terrain meshes for performance
    if (currentMapType === MapType.MOUNTAIN && cachedTerrainMeshes.length > 0) {
        allCollidableObjects.push(...cachedTerrainMeshes);
    }
    
    const intersects = groundRaycaster.intersectObjects(allCollidableObjects, false);
    
    if (intersects.length > 0) { 
        const closestIntersect = intersects[0]; 
        const groundY = closestIntersect.point.y + PLAYER_HEIGHT;
        
        // Apply gravity and jump physics
        verticalVelocity -= GRAVITY * delta;
        const newY = playerObject.position.y + verticalVelocity * delta;
        
        // Check if player should land on ground
        if (newY <= groundY) {
            playerObject.position.y = groundY;
            if (verticalVelocity < 0) { // Only land if falling
                verticalVelocity = 0;
                isOnGround = true;
            }
        } else {
            playerObject.position.y = newY;
            isOnGround = false;
        }
    }
    else { 
        // No ground detected, apply gravity
        verticalVelocity -= GRAVITY * delta;
        playerObject.position.y += verticalVelocity * delta;
        isOnGround = false;
    }

    if (pitchObject) {
        const basePitchByMouse = pitchObject.rotation.x; 
        let finalPitch = basePitchByMouse - cameraPitchRecoil; 
        pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, finalPitch));
    }

    }
  } else { 
      horizontalVelocity.set(0,0,0);
      verticalVelocity = 0;
      if (pitchObject && cameraPitchRecoil !== 0) {
          const basePitchByMouse = pitchObject.rotation.x;
          let finalPitch = basePitchByMouse - cameraPitchRecoil;
          pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, finalPitch));
      }
  }
  
  // Send player state for multiplayer (works for both bike and walking modes)
  if (gameMode === 'multiplayer' && time - lastSentStateTime > STATE_SEND_INTERVAL) { 
      sendPlayerState(); 
      lastSentStateTime = time; 
  }
  
  updateWeaponDynamics(delta); 
  updateProjectiles(delta);
  if (gameMode === 'multiplayer') updateRemoteProjectiles(delta);
  
  // Update zombie system for single player
  if (gameMode === 'singleplayer') {
    updateZombies(delta);
    
    // Spawn zombies at intervals
    zombieSpawnTimer += delta * 1000;
    if (zombieSpawnTimer >= zombieSpawnInterval) {
      for (let i = 0; i < zombieSpawnCount; i++) {
        spawnZombie();
      }
      zombieSpawnTimer = 0;
      
      // Increase difficulty over time
      const timeSurvived = (performance.now() - gameStartTime) / 1000;
      if (timeSurvived > 30) { // After 30 seconds
        zombieSpawnInterval = Math.max(2000, 5000 - (timeSurvived - 30) * 50); // Faster spawning
        zombieSpawnCount = Math.min(3, 1 + Math.floor((timeSurvived - 30) / 60)); // More zombies
      }
    }
  }
  
  updateAmmoDisplay();
  updateEnemyCompass();
  updateMovementStatus();
  updateHealthRegeneration(delta);
  updateHealthDisplay();
  updateSpeedIndicator(); // Update bike speed indicator
  updateBikeDurabilityIndicator(); // Update bike durability indicator
  updatePlayerIdLabels(); // Update player ID labels orientation

  renderer.render(scene, camera);
}

initializeApp();
