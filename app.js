/* ============================================================
   ARENA – Smart Stadium Companion
   Application Logic
   ============================================================ */

// ═══════════════ STATE ═══════════════
const state = {
    currentScreen: 'screen-home',
    cart: [],
    isNavigating: false,
    navPanelOpen: false,
    friendsVisible: true,
    orderPlaced: false,
    score: {
        team1: 245,
        wickets1: 4,
        overs: 34.2,
        batsman: 'Kohli',
        batsmanRuns: 87,
        batsmanBalls: 62
    },
    orderHistory: [
        {
            id: 'ORD-1024',
            items: [
                { name: 'Classic Burger', qty: 1, price: 299 },
                { name: 'Fresh Lemonade', qty: 2, price: 99 }
            ],
            total: 497,
            date: 'Apr 14, 2026',
            time: '12:45 PM',
            status: 'Delivered',
            stall: 'Food Court 1'
        }
    ],
    parkingInfo: {
        zone: 'Zone B – North Parking',
        slot: 'B-147',
        status: 'Active',
        level: 'P2',
        entryGate: 'Gate 4',
        timeParked: '1:15 PM',
        distance: '450m',
        navKey: 'parking-B'
    }
};

// ═══════════════ FOOD DATA ═══════════════
const foodItems = [
    {
        id: 5, name: 'Popcorn', price: 129, prepTime: '2 min',
        category: 'snacks', image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&q=80&w=800',
        available: true, stall: 'Food Court 1', desc: 'Freshly popped buttery theater-style corn'
    },
    {
        id: 8, name: 'Chicken Wrap', price: 249, prepTime: '10 min',
        category: 'meals', image: 'assets/chicken-wrap.png',
        available: true, stall: 'Food Court 2', desc: 'Grilled chicken with ranch & greens'
    },
    {
        id: 10, name: 'Ice Cream', price: 149, prepTime: '2 min',
        category: 'desserts', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800',
        available: true, stall: 'Food Court 1', desc: 'Double scoop gourmet swirl'
    },
    {
        id: 1, name: 'Classic Burger', price: 299, prepTime: '8 min',
        category: 'snacks', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
        available: true, stall: 'Food Court 1', desc: 'Juicy Angus beef with aged cheddar'
    },
    {
        id: 2, name: 'Pepperoni Pizza', price: 349, prepTime: '12 min',
        category: 'meals', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
        available: true, stall: 'Food Court 2', desc: 'Sourdough crust with spicy pepperoni'
    },
    {
        id: 3, name: 'Loaded Nachos', price: 199, prepTime: '5 min',
        category: 'snacks', image: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&q=80&w=800',
        available: true, stall: 'Food Court 1', desc: 'Tortilla chips with melted queso'
    },
    {
        id: 4, name: 'Classic Hot Dog', price: 179, prepTime: '4 min',
        category: 'snacks', image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&q=80&w=800',
        available: true, stall: 'Food Court 1', desc: 'Gourmet sausage in a brioche bun'
    },
    {
        id: 6, name: 'Fresh Lemonade', price: 99, prepTime: '3 min',
        category: 'drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
        available: true, stall: 'Food Court 2', desc: 'Squeezed lemons with fresh mint'
    },
    {
        id: 7, name: 'Cold Beer', price: 299, prepTime: '1 min',
        category: 'drinks', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=800',
        available: true, stall: 'Food Court 1', desc: 'Ice-cold premium craft lager'
    },
    {
        id: 9, name: 'Veg Biryani', price: 199, prepTime: '8 min',
        category: 'meals', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800',
        available: false, stall: 'Food Court 2', desc: 'Saffron-infused basmati rice'
    }
];

// ═══════════════ TICKET DATA ═══════════════
const tickets = [
    {
        id: 'T1',
        event: 'IND vs AUS • ICC CWC 2026',
        date: 'April 14, 2026',
        time: '2:00 PM IST',
        venue: 'Narendra Modi Stadium, Ahmedabad',
        stand: 'North Stand',
        section: 'B',
        row: '14',
        seat: '7',
        gate: 'B2',
        color: 'linear-gradient(135deg, #00c6ff, #0072ff)',
        qrData: 'ARENA-TICKET-B14-7-UID882'
    },
    {
        id: 'T2',
        event: 'IND vs AUS • ICC CWC 2026',
        date: 'April 14, 2026',
        time: '2:00 PM IST',
        venue: 'Narendra Modi Stadium, Ahmedabad',
        stand: 'North Stand',
        section: 'B',
        row: '14',
        seat: '8',
        gate: 'B2',
        color: 'linear-gradient(135deg, #f093fb, #f5576c)',
        qrData: 'ARENA-TICKET-B14-8-UID883'
    }
];

// ═══════════════ PROFILE & TICKETS LOGIC ═══════════════
function openTicketsScreen() {
    navigateToScreen('screen-tickets');
    renderTickets();
}

function renderTickets() {
    const container = document.getElementById('tickets-list');
    if (!container) return;

    container.innerHTML = tickets.map(ticket => `
        <div class="ticket-entry-card" onclick="viewTicketDetail('${ticket.id}')">
            <div class="ticket-accent" style="background: ${ticket.color}"></div>
            <div class="ticket-entry-info">
                <span class="ticket-entry-event">${ticket.event}</span>
                <span class="ticket-entry-seat">Stand ${ticket.stand} • Seat ${ticket.seat}</span>
                <span class="ticket-entry-date">${ticket.date} • ${ticket.time}</span>
            </div>
            <span class="material-symbols-rounded">chevron_right</span>
        </div>
    `).join('');
}

function viewTicketDetail(id) {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;

    const modal = document.getElementById('ticket-detail-screen');
    const content = document.getElementById('ticket-detail-content');
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="ticket-card-large">
            <div class="ticket-top" style="background: ${ticket.color}">
                <div class="ticket-logo">ARENA</div>
                <div class="badge-vip">GENERAL ACCESS</div>
            </div>
            <div class="ticket-body">
                <h2 class="t-event-name">${ticket.event}</h2>
                <p class="t-event-venue">${ticket.venue}</p>
                <p class="t-event-date">📅 ${ticket.date} • ${ticket.time}</p>
                
                <div class="t-divider"></div>
                
                <div class="t-grid">
                    <div class="t-item"><span class="t-label">STAND</span><span class="t-val">${ticket.stand}</span></div>
                    <div class="t-item"><span class="t-label">SECTION</span><span class="t-val">${ticket.section}</span></div>
                    <div class="t-item"><span class="t-label">ROW</span><span class="t-val">${ticket.row}</span></div>
                    <div class="t-item"><span class="t-label">SEAT</span><span class="t-val">${ticket.seat}</span></div>
                </div>
                
                <div class="t-gate-info">
                    <span class="material-symbols-rounded">door_front</span>
                    <span>Entry through <strong>GATE ${ticket.gate}</strong></span>
                </div>
                
                <div class="t-qr-container">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${ticket.qrData}" alt="QR Code" class="t-qr-img">
                    <p class="t-qr-label">Scan this QR at entry gate</p>
                </div>
            </div>
            <div class="ticket-footer">
                <p>DOORS OPEN AT 12:30 PM • NO RE-ENTRY</p>
            </div>
        </div>
        
        <div class="ticket-actions">
            <button class="t-action-btn" onclick="handleTicketAction('download')">
                <span class="material-symbols-rounded">download</span>
                <span>Download</span>
            </button>
            <button class="t-action-btn" onclick="handleTicketAction('share')">
                <span class="material-symbols-rounded">share</span>
                <span>Share</span>
            </button>
            <button class="t-action-btn btn-primary" onclick="viewSeatOnMap('${ticket.id}')">
                <span class="material-symbols-rounded">map</span>
                <span>View Seat</span>
            </button>
        </div>
    `;

    modal.classList.add('active');
}

function closeTicketDetail() {
    const modal = document.getElementById('ticket-detail-screen');
    if (modal) modal.classList.remove('active');
}

function handleTicketAction(type) {
    if (type === 'download') showToast('Ticket downloaded to Gallery', 'download');
    else if (type === 'share') showToast('Sharing ticket...', 'share');
}

function viewSeatOnMap(ticketId) {
    closeTicketDetail();
    navigateToScreen('screen-map');
    setTimeout(() => startNavigationToDest('seat', 'My Seat B14-7'), 500);
}

function handleProfileMenu(action) {
    if (action === 'tickets') openTicketsScreen();
    else if (action === 'orders') openOrdersScreen();
    else if (action === 'friends') openFriendsScreen();
    else if (action === 'parking') openParkingScreen();
    else if (action === 'help') openHelpScreen();
    else if (action === 'logout') showToast('Signing out...', 'logout');
}

// ═══════════════ AI RESPONSES ═══════════════
const assistantFlows = {
    'start': {
        text: "Hey there! 👋 I'm your ARENA AI assistant. How can I help you today?",
        options: [
            { label: '📍 Navigation', flow: 'navigation' },
            { label: '🚻 Facilities', flow: 'facilities' },
            { label: '📊 Crowd & Safety', flow: 'safety' },
            { label: '🚗 Parking', flow: 'parking' },
            { label: '🆘 Contact Staff', flow: 'staff_confirm' }
        ]
    },
    'navigation': {
        text: "Where would you like to go?",
        options: [
            { label: '💺 My Seat', action: 'nav_seat' },
            { label: '👥 Find a Friend', flow: 'friends' },
            { label: '🚪 Find Nearest Exit', flow: 'exits' },
            { label: '⬅️ Back', flow: 'start' }
        ]
    },
    'friends': {
        text: "Which friend are you looking for?",
        options: [
            { label: 'Rahul Sharma', action: 'friend_rahul' },
            { label: 'Priya Patel', action: 'friend_priya' },
            { label: 'Amit Kumar', action: 'friend_amit' },
            { label: '⬅️ Back', flow: 'navigation' }
        ]
    },
    'exits': {
        text: "Gate A and D are currently the least crowded exits.",
        options: [
            { label: 'Navigate to Gate A', action: 'nav_gateA' },
            { label: 'Navigate to Gate D', action: 'nav_gateD' },
            { label: '⬅️ Back', flow: 'navigation' }
        ]
    },
    'facilities': {
        text: "What are you looking for?",
        options: [
            { label: '🚻 Washroom', action: 'nav_washroom' },
            { label: '🍔 Food & Drinks', action: 'go_order' },
            { label: '🏥 Medical Aid', action: 'nav_medical' },
            { label: '⬅️ Back', flow: 'start' }
        ]
    },
    'safety': {
        text: "Looking for stadium safety or crowd info?",
        options: [
            { label: '📈 Crowd Heatmap', action: 'go_map_heat' },
            { label: '🚨 Emergency SOS', action: 'go_sos' },
            { label: '🏟️ Stadium Map', action: 'go_map' },
            { label: '⬅️ Back', flow: 'start' }
        ]
    },
    'parking': {
        text: "Your vehicle is at Spot B-24, Zone B.",
        options: [
            { label: 'Navigate to Parking', action: 'nav_parking' },
            { label: '⬅️ Back', flow: 'start' }
        ]
    },
    'staff_confirm': {
        text: "Do you need urgent assistance? I can alert the nearest security or stadium staff member to your location.",
        options: [
            { label: '⚠️ Yes, Alert Staff', action: 'contact_staff' },
            { label: '❌ Cancel', flow: 'start' }
        ]
    }
};

const assistantResponses = {
    'nav_seat': {
        text: "Your seat is at **Section B, Row 14, Seat 7**. It's about a 2-minute walk from here.",
        options: [{ label: '🚀 Start Navigation', action: 'trigger_nav_seat' }, { label: '🏠 Main Menu', flow: 'start' }]
    },
    'nav_washroom': {
        text: "The nearest washroom is **Washroom 1** (North Stand), just 50m away. It currently has no wait time.",
        options: [{ label: '🚀 Start Navigation', action: 'trigger_nav_washroom' }, { label: '🏠 Main Menu', flow: 'start' }]
    },
    'nav_medical': {
        text: "The nearest Medical Aid Station is located at the **North Stand Entrance**.",
        options: [{ label: '🚀 Start Navigation', action: 'trigger_nav_medical' }, { label: '🏠 Main Menu', flow: 'start' }]
    },
    'contact_staff_alerted': {
        text: "🚨 **Security Alerted!**\n\nStadium staff and security have been notified of your request. A team member is heading to your current location (North Stand Concourse) and will reach you shortly.\n\n**User Details sent:**\n• Name: Aryan Kumar\n• Seat: B14-7\n• Current Location: Concourse Area",
        options: [{ label: '🏠 Back to Menu', flow: 'start' }]
    }
};

// ═══════════════ STADIUM WAYPOINT GRAPH ═══════════════
// Nodes represent walkable positions along corridors, stairs, and pathways.
// User is at node 'user' in the North Stand concourse area.
const waypoints = {
    user:       { x: 480, y: 195 },
    // Concourse nodes (ring around the stadium between stands and field)
    nw1:        { x: 220, y: 210 },
    n1:         { x: 310, y: 175 },
    n2:         { x: 400, y: 160 },
    n3:         { x: 490, y: 175 },
    ne1:        { x: 580, y: 210 },
    e1:         { x: 620, y: 280 },
    e2:         { x: 640, y: 350 },
    e3:         { x: 620, y: 420 },
    se1:        { x: 580, y: 480 },
    s1:         { x: 490, y: 520 },
    s2:         { x: 400, y: 535 },
    s3:         { x: 310, y: 520 },
    sw1:        { x: 220, y: 480 },
    w1:         { x: 180, y: 420 },
    w2:         { x: 160, y: 350 },
    w3:         { x: 180, y: 280 },
    // POI nodes
    food1:      { x: 280, y: 140 },
    food2:      { x: 620, y: 480 },
    wr1:        { x: 190, y: 200 },
    wr2:        { x: 620, y: 220 },
    wr3:        { x: 530, y: 540 },
    wr4:        { x: 200, y: 470 },
    gateA:      { x: 400, y: 55 },
    gateB:      { x: 765, y: 350 },
    gateC:      { x: 400, y: 645 },
    gateD:      { x: 35, y: 350 },
    exitN:      { x: 300, y: 95 },
    exitS:      { x: 500, y: 600 },
    parkA:      { x: 250, y: 75 },
    parkB:      { x: 560, y: 610 },
    medical:    { x: 340, y: 100 },
    seat:       { x: 610, y: 300 },
};

// Edges: bidirectional connections with crowd-weight (higher = more crowded)
const edges = [
    // Main concourse ring
    ['nw1','n1',1], ['n1','n2',1], ['n2','n3',1], ['n3','ne1',1],
    ['ne1','e1',2], ['e1','e2',3], ['e2','e3',3], ['e3','se1',2],
    ['se1','s1',2], ['s1','s2',2], ['s2','s3',1], ['s3','sw1',1],
    ['sw1','w1',1], ['w1','w2',1], ['w2','w3',1], ['w3','nw1',1],
    // User connects to concourse
    ['user','n3',1], ['user','ne1',1], ['user','n2',2],
    // POI connections (corridors / stairways to POIs)
    ['n1','food1',1], ['nw1','food1',1],
    ['se1','food2',2], ['s1','food2',2],
    ['nw1','wr1',1], ['w3','wr1',1],
    ['ne1','wr2',2], ['e1','wr2',2],
    ['s1','wr3',2], ['se1','wr3',2],
    ['sw1','wr4',1], ['w1','wr4',1],
    // Gates (pathways from concourse to gates)
    ['n2','gateA',1], ['n1','gateA',1], ['n3','gateA',1],
    ['e2','gateB',3],
    ['s2','gateC',2], ['s1','gateC',2], ['s3','gateC',2],
    ['w2','gateD',1],
    // Exits
    ['n1','exitN',1], ['nw1','exitN',1],
    ['s1','exitS',2], ['s2','exitS',2],
    // Parking (outside gates)
    ['gateA','parkA',1], ['exitN','parkA',1],
    ['gateC','parkB',1], ['exitS','parkB',2],
    // Medical
    ['n1','medical',1], ['n2','medical',1],
    // Seat (Section B, East)
    ['e1','seat',2], ['e2','seat',2], ['ne1','seat',2],
];

// Build adjacency list
const graph = {};
function buildGraph() {
    for (const id of Object.keys(waypoints)) {
        graph[id] = [];
    }
    for (const [a, b, crowd] of edges) {
        const dx = waypoints[a].x - waypoints[b].x;
        const dy = waypoints[a].y - waypoints[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        graph[a].push({ to: b, dist, crowd });
        graph[b].push({ to: a, dist, crowd });
    }
}
buildGraph();

// Dijkstra's algorithm with configurable weight
function dijkstra(start, end, weightFn) {
    const dist = {};
    const prev = {};
    const visited = new Set();
    for (const id of Object.keys(waypoints)) {
        dist[id] = Infinity;
    }
    dist[start] = 0;

    while (true) {
        let u = null;
        let minD = Infinity;
        for (const id of Object.keys(waypoints)) {
            if (!visited.has(id) && dist[id] < minD) {
                minD = dist[id];
                u = id;
            }
        }
        if (u === null || u === end) break;
        visited.add(u);
        for (const edge of (graph[u] || [])) {
            const w = weightFn(edge);
            const alt = dist[u] + w;
            if (alt < dist[edge.to]) {
                dist[edge.to] = alt;
                prev[edge.to] = u;
            }
        }
    }

    // Reconstruct path
    const path = [];
    let cur = end;
    while (cur) {
        path.unshift(cur);
        cur = prev[cur];
    }
    if (path[0] !== start) return null;
    return { path, totalDist: dist[end] };
}

// Generate SVG path string from waypoint IDs
function waypointsToSVGPath(nodeIds) {
    if (!nodeIds || nodeIds.length < 2) return '';
    const pts = nodeIds.map(id => waypoints[id]);
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
        // Use quadratic curves for smoother turns
        if (i < pts.length - 1) {
            const cp = pts[i];
            const next = pts[i + 1];
            const mx = (cp.x + next.x) / 2;
            const my = (cp.y + next.y) / 2;
            d += ` Q ${cp.x} ${cp.y} ${mx} ${my}`;
            // skip next since we used it as endpoint
        } else {
            d += ` L ${pts[i].x} ${pts[i].y}`;
        }
    }
    return d;
}

function computePathDistance(nodeIds) {
    let total = 0;
    for (let i = 1; i < nodeIds.length; i++) {
        const a = waypoints[nodeIds[i - 1]];
        const b = waypoints[nodeIds[i]];
        total += Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }
    return total;
}

function distToWalkTime(pixelDist) {
    // ~60 pixels per minute walking speed in this map scale
    return Math.max(1, Math.round(pixelDist / 60));
}

function computeRoutes(destKey) {
    const routes = [];

    // Route 1: Fastest (shortest distance)
    const r1 = dijkstra('user', destKey, e => e.dist);
    if (r1) {
        const d = computePathDistance(r1.path);
        routes.push({
            label: '⚡ Fastest Route',
            type: 'fastest',
            path: r1.path,
            svgPath: waypointsToSVGPath(r1.path),
            dist: Math.round(d * 0.8),
            time: distToWalkTime(d),
            color: '#00e676',
            strokeW: 4,
            dashArr: ''
        });
    }

    // Route 2: Least crowded (minimize crowd)
    const r2 = dijkstra('user', destKey, e => e.crowd * 100 + e.dist * 0.3);
    if (r2) {
        const d = computePathDistance(r2.path);
        routes.push({
            label: '🟢 Least Crowded',
            type: 'less-crowd',
            path: r2.path,
            svgPath: waypointsToSVGPath(r2.path),
            dist: Math.round(d * 0.8),
            time: distToWalkTime(d),
            color: '#448aff',
            strokeW: 3,
            dashArr: '8 5'
        });
    }

    // Route 3: Shortest distance (pure distance, penalize crowd less)
    const r3 = dijkstra('user', destKey, e => e.dist + e.crowd * 5);
    if (r3) {
        const d = computePathDistance(r3.path);
        routes.push({
            label: '📏 Shortest Distance',
            type: 'shortest',
            path: r3.path,
            svgPath: waypointsToSVGPath(r3.path),
            dist: Math.round(d * 0.8),
            time: distToWalkTime(d),
            color: '#ff9100',
            strokeW: 3,
            dashArr: '4 6'
        });
    }

    // Deduplicate routes that are identical
    const unique = [];
    const seen = new Set();
    for (const r of routes) {
        const key = r.path.join(',');
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(r);
        }
    }
    return unique;
}

// ═══════════════ POI DATA REGISTRY ═══════════════
const poiData = {
    'food-1':      { icon: '🍔', name: 'Food Court 1', sub: 'North Stand • Burgers, Snacks', dest: 'food1', crowd: 'Moderate', walkNode: 'food1' },
    'food-2':      { icon: '🍕', name: 'Food Court 2', sub: 'South Stand • Pizza, Wraps', dest: 'food2', crowd: 'Busy', walkNode: 'food2' },
    'washroom-1':  { icon: '🚻', name: 'Washroom 1', sub: 'North Stand • Available', dest: 'wr1', crowd: 'Low', walkNode: 'wr1' },
    'washroom-2':  { icon: '🚻', name: 'Washroom 2', sub: 'East Stand • Moderate wait', dest: 'wr2', crowd: 'Moderate', walkNode: 'wr2' },
    'washroom-3':  { icon: '🚻', name: 'Washroom 3', sub: 'South Stand • Busy', dest: 'wr3', crowd: 'Busy', walkNode: 'wr3' },
    'washroom-4':  { icon: '🚻', name: 'Washroom 4', sub: 'West Stand • Available', dest: 'wr4', crowd: 'Low', walkNode: 'wr4' },
    'gate-a':      { icon: '🚪', name: 'Gate A (North)', sub: 'Main entrance • Low crowd', dest: 'gateA', crowd: 'Low', walkNode: 'gateA' },
    'gate-b':      { icon: '🚪', name: 'Gate B (East)', sub: 'East entrance • Very crowded', dest: 'gateB', crowd: 'Very High', walkNode: 'gateB' },
    'gate-c':      { icon: '🚪', name: 'Gate C (South)', sub: 'South entrance • Moderate', dest: 'gateC', crowd: 'Moderate', walkNode: 'gateC' },
    'gate-d':      { icon: '🚪', name: 'Gate D (West)', sub: 'West entrance • Low crowd', dest: 'gateD', crowd: 'Low', walkNode: 'gateD' },
    'parking-a':   { icon: '🅿️', name: 'Parking Zone A', sub: 'Near Gate A • 85 spots available', dest: 'parkA', crowd: 'Low', walkNode: 'parkA' },
    'parking-b':   { icon: '🅿️', name: 'Parking Zone B', sub: 'Near Gate C • 57 spots available', dest: 'parkB', crowd: 'Moderate', walkNode: 'parkB' },
    'exit-north':  { icon: '🚪', name: 'Emergency Exit (North)', sub: 'North Stand • Low crowd', dest: 'exitN', crowd: 'Low', walkNode: 'exitN' },
    'exit-south':  { icon: '🚪', name: 'Emergency Exit (South)', sub: 'South Stand • Moderate', dest: 'exitS', crowd: 'Moderate', walkNode: 'exitS' },
    'medical':     { icon: '🏥', name: 'Medical Aid Station', sub: 'North Stand Entrance', dest: 'medical', crowd: 'Low', walkNode: 'medical' },
    'section-a':   { icon: '🏟️', name: 'Section A – North Stand', sub: 'Rows 1-30 • Low crowd', dest: 'n2', crowd: 'Low', walkNode: 'n2' },
    'section-b':   { icon: '🏟️', name: 'Section B – East Stand', sub: 'Rows 1-30 • Very High crowd', dest: 'seat', crowd: 'Very High', walkNode: 'seat' },
    'section-c':   { icon: '🏟️', name: 'Section C – South Stand', sub: 'Rows 1-30 • High crowd', dest: 's2', crowd: 'High', walkNode: 's2' },
    'section-d':   { icon: '🏟️', name: 'Section D – West Stand', sub: 'Rows 1-30 • Medium crowd', dest: 'w2', crowd: 'Medium', walkNode: 'w2' },
};

// Map triggerNavigation keys to waypoint dest keys
const navKeyToDest = {
    'seat': 'seat',
    'food1': 'food1',
    'food2': 'food2',
    'washroom': 'wr1',
    'washroom1': 'wr1',
    'washroom2': 'wr2',
    'washroom3': 'wr3',
    'washroom4': 'wr4',
    'gateA': 'gateA',
    'gateB': 'gateB',
    'gateC': 'gateC',
    'gateD': 'gateD',
    'exit': 'gateD',
    'parking': 'parkB',
};

const navKeyToName = {
    'seat': 'My Seat B14-7',
    'food1': 'Food Court 1',
    'food2': 'Food Court 2',
    'washroom': 'Washroom 1',
    'washroom1': 'Washroom 1 – North',
    'washroom2': 'Washroom 2 – East',
    'washroom3': 'Washroom 3 – South',
    'washroom4': 'Washroom 4 – West',
    'gateA': 'Gate A (North)',
    'gateB': 'Gate B (East)',
    'gateC': 'Gate C (South)',
    'gateD': 'Gate D (West)',
    'exit': 'Gate D (Exit)',
    'parking': 'Parking B-24',
};

// ═══════════════ CROWD ALERTS ═══════════════
const crowdAlerts = [
    'Gate B will be crowded in ~10 mins. Consider using Gate D.',
    'South Stand food court wait time increasing. Try North Stand.',
    'Post-innings rush expected in 5 mins. Head to washrooms now.',
    'Parking Zone A filling up fast. Zone C has 45 spots available.',
    'Exit from Gate A recommended after match. Gate B will be packed.'
];

// ═══════════════ SCORE EVENTS ═══════════════
const scoreEvents = [
    '🏏 Kohli hits a SIX! 87*(62)',
    '🏏 Kohli reaches his CENTURY! 100*(71)',
    '🏏 FOUR! Kohli drives through covers. 104*(73)',
    '🏏 Jadeja comes to the crease',
    '🏏 Jadeja starts with a boundary! 4*(2)',
    '🏏 India cross 280! Strong position',
    '⚡ WICKET! Kohli caught at boundary. 112(81)',
    '🏏 Pant walks in at No.6',
    '🏏 Pant hits a massive SIX first ball! 6*(1)'
];

// ═══════════════ FRIEND TRACKING ═══════════════
const friendsData = {
    'rahul': { id: 'rahul', name: 'Rahul Sharma', cx: 350, cy: 185, targetNode: 'n1', color: '#7c4dff', icon: 'R', moving: true, section: 'North Stand – Concourse' },
    'priya': { id: 'priya', name: 'Priya Patel', cx: 600, cy: 470, targetNode: 'se1', color: '#ff6d00', icon: 'P', moving: true, section: 'South-East Stand – Section B' },
    'amit':  { id: 'amit', name: 'Amit Kumar', cx: 100, cy: 380, targetNode: 'w2', color: '#00e676', icon: 'A', moving: true, section: 'West Stand – Section D' }
};

const friendSuggestions = [
    { name: 'Sameer Sen', id: 'sameer', color: '#03a9f4', icon: 'S' },
    { name: 'Kavya Rao', id: 'kavya', color: '#e91e63', icon: 'K' },
    { name: 'Deepak Jha', id: 'deepak', color: '#fdd835', icon: 'D' }
];

function openFriendsScreen() {
    navigateToScreen('screen-friends');
    renderFriends();
}

function renderFriends() {
    const list = document.getElementById('friends-list-container');
    if (!list) return;

    const friends = Object.values(friendsData);
    
    if (friends.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><span class="material-symbols-rounded">person_add</span></div>
                <h3>No friends added yet</h3>
                <p>Add friends to track and navigate to them easily in the stadium.</p>
                <button class="btn-primary" onclick="showAddFriendOptions()">Add Your First Friend</button>
            </div>
        `;
        return;
    }

    list.innerHTML = friends.map(f => `
        <div class="friend-card-premium" onclick="showFriendOnMap('${f.id}')">
            <div class="f-avatar" style="background: ${f.color}"><span>${f.icon}</span></div>
            <div class="f-info">
                <div class="f-name-row">
                    <span class="f-name">${f.name}</span>
                    <span class="f-status-tag ${f.moving ? 'moving' : 'static'}">${f.moving ? 'Moving' : 'At Venue'}</span>
                </div>
                <div class="f-loc-row">
                    <span class="material-symbols-rounded">location_on</span>
                    <span class="f-location">${f.section}</span>
                </div>
            </div>
            <button class="f-remove-btn" onclick="confirmRemoveFriend(event, '${f.id}')">
                <span class="material-symbols-rounded">delete</span>
            </button>
        </div>
    `).join('');
}

function showAddFriendOptions() {
    const modal = document.getElementById('add-friend-modal');
    const list = document.getElementById('suggestion-list');
    const input = document.getElementById('friend-name-input');
    const error = document.getElementById('add-friend-error');

    if (!modal || !list) return;

    // Reset state
    if (input) input.value = '';
    if (error) error.style.display = 'none';

    list.innerHTML = friendSuggestions.filter(s => !friendsData[s.id]).map(s => `
        <div class="suggestion-item">
            <div class="f-avatar sm" style="background: ${s.color}"><span>${s.icon}</span></div>
            <span class="s-name">${s.name}</span>
            <button class="s-add-btn" onclick="addFriendFromSuggestion('${s.id}')">Add</button>
        </div>
    `).join('') || '<p class="all-added">All suggested friends are already in your list!</p>';

    modal.classList.add('open');
    
    // Auto focus
    setTimeout(() => {
        if (input) input.focus();
    }, 400);
}

function closeAddFriend() {
    const modal = document.getElementById('add-friend-modal');
    if (modal) modal.classList.remove('open');
}

function processAddFriend() {
    const input = document.getElementById('friend-name-input');
    const error = document.getElementById('add-friend-error');
    const name = input?.value.trim();

    if (!name) {
        if (error) error.style.display = 'block';
        if (input) input.focus();
        return;
    }

    if (error) error.style.display = 'none';
    
    // Use the name to add a friend
    const friendId = 'custom-' + Date.now();
    const colors = ['#7c4dff', '#ff6d00', '#00e676', '#448aff', '#ffc107', '#e91e63'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addFriend({
        id: friendId,
        name: name,
        color: randomColor,
        icon: name.charAt(0).toUpperCase()
    });
}

function addFriendFromSuggestion(id) {
    const s = friendSuggestions.find(item => item.id === id);
    if (!s) return;
    addFriend(s);
}

function openHelpScreen() {
    navigateToScreen('screen-help');
}

function openParkingScreen() {
    navigateToScreen('screen-parking');
    renderParkingUI();
}

function toggleFAQ(button) {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close other FAQs
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    
    if (!isActive) {
        item.classList.add('active');
    }
}

function contactStaff() {
    showToast('Stadium staff notified. Help is on the way!', 'support_agent');
}

function reportIssue() {
    showToast('Issue reported successfully. Thank you!', 'report_problem');
}

function renderParkingUI() {
    const container = document.getElementById('parking-content');
    if (!container) return;

    if (!state.parkingInfo) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><span class="material-symbols-rounded">local_parking</span></div>
                <h3>No saved parking location</h3>
                <p>Your parking details will appear here once you save your vehicle location.</p>
                <button class="btn-primary" onclick="navigateToScreen('screen-map')">Find Parking on Map</button>
            </div>
        `;
        return;
    }

    const p = state.parkingInfo;
    container.innerHTML = `
        <div class="parking-card-premium">
            <div class="p-header">
                <div class="p-main-info">
                    <span class="p-zone">${p.zone}</span>
                    <span class="p-status-tag status-active">${p.status}</span>
                </div>
                <div class="p-slot-circle">
                    <span class="p-slot-label">SLOT</span>
                    <span class="p-slot-value">${p.slot}</span>
                </div>
            </div>

            <div class="p-details-grid">
                <div class="p-detail">
                    <span class="p-label">LEVEL</span>
                    <span class="p-val">${p.level}</span>
                </div>
                <div class="p-detail">
                    <span class="p-label">ENTRY GATE</span>
                    <span class="p-val">${p.entryGate}</span>
                </div>
                <div class="p-detail">
                    <span class="p-label">TIME PARKED</span>
                    <span class="p-val">${p.timeParked}</span>
                </div>
                <div class="p-detail">
                    <span class="p-label">DISTANCE</span>
                    <span class="p-val">${p.distance}</span>
                </div>
            </div>

            <div class="parking-actions">
                <div class="p-secondary-actions full-width">
                    <button class="p-btn-edit" onclick="showToast('Feature coming soon!', 'edit')">
                        <span class="material-symbols-rounded">edit</span> Update
                    </button>
                    <button class="p-btn-clear" onclick="clearParking()">
                        <span class="material-symbols-rounded">delete</span> Clear
                    </button>
                </div>
            </div>
        </div>
        
        <div class="parking-help">
            <span class="material-symbols-rounded">lightbulb</span>
            <p>Save your parking location automatically by enabling "Auto-Detect Parking" in Settings.</p>
        </div>
    `;
}


function clearParking() {
    if (confirm('Are you sure you want to clear your saved parking location?')) {
        state.parkingInfo = null;
        renderParkingUI();
        showToast('Parking location cleared', 'delete');
    }
}

function addFriend(friendObj) {
    const { id, name, color, icon } = friendObj;

    // Simulate starting location
    friendsData[id] = {
        id,
        name,
        color,
        icon,
        cx: 300 + Math.random() * 200,
        cy: 150 + Math.random() * 200,
        targetNode: 'n2',
        moving: true,
        section: 'Entering Stadium Gate'
    };

    updateFriendGraphNode(friendsData[id]);
    createFriendMarker(friendsData[id]);
    
    closeAddFriend();
    renderFriends();
    showToast(`${name} added to friends!`, 'person_add');
}

function confirmRemoveFriend(e, id) {
    e.stopPropagation();
    const f = friendsData[id];
    if (!f) return;

    if (confirm(`Remove ${f.name} from your friends list?`)) {
        removeFriend(id);
    }
}

function removeFriend(id) {
    const f = friendsData[id];
    if (!f) return;

    // Remove from map
    const marker = document.getElementById(`friend-${id}`);
    if (marker) marker.remove();

    // Remove from simulation
    if (f.lastNearest && graph[f.lastNearest]) {
        graph[f.lastNearest] = graph[f.lastNearest].filter(e => e.to !== `friend-${id}`);
    }
    delete waypoints[`friend-${id}`];
    delete graph[`friend-${id}`];

    // Remove from data
    delete friendsData[id];
    
    renderFriends();
    showToast(`Friend removed`, 'delete');
}

function createFriendMarker(f) {
    const map = document.getElementById('stadium-map');
    if (!map) return;

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("id", `friend-${f.id}`);
    group.setAttribute("class", "friend-marker");
    group.setAttribute("onclick", `showFriendOnMap('${f.id}')`);
    group.style.cursor = "pointer";

    group.innerHTML = `
        <circle cx="${f.cx}" cy="${f.cy}" r="12" fill="${f.color}" stroke="white" stroke-width="2" />
        <text x="${f.cx}" y="${f.cy + 4}" text-anchor="middle" fill="white" font-size="10" font-weight="bold" style="pointer-events:none">${f.icon}</text>
    `;

    const friendsLayer = document.getElementById('friends-layer');
    if (friendsLayer) friendsLayer.appendChild(group);
}

function findNearestWaypoint(x, y) {
    let nearest = null;
    let minDist = Infinity;
    for (const [id, wp] of Object.entries(waypoints)) {
        if (id.startsWith('friend-')) continue;
        const dist = Math.sqrt((wp.x - x)**2 + (wp.y - y)**2);
        if (dist < minDist) {
            minDist = dist;
            nearest = id;
        }
    }
    return nearest;
}

function updateFriendGraphNode(f) {
    if (f.lastNearest && graph[f.lastNearest]) {
        graph[f.lastNearest] = graph[f.lastNearest].filter(e => e.to !== `friend-${f.id}`);
    }
    const destKey = `friend-${f.id}`;
    waypoints[destKey] = { x: f.cx, y: f.cy };
    const nearest = findNearestWaypoint(f.cx, f.cy);
    
    if (nearest) {
        f.lastNearest = nearest;
        graph[destKey] = [{ to: nearest, dist: Math.sqrt((f.cx - waypoints[nearest].x)**2 + (f.cy - waypoints[nearest].y)**2), crowd: 1 }];
        graph[nearest].push({ to: destKey, dist: graph[destKey][0].dist, crowd: 1, dynamic: true });
    }
}

function startFriendSimulation() {
    // Initialize all friends in the graph immediately
    Object.values(friendsData).forEach(f => {
        updateFriendGraphNode(f);
    });

    setInterval(() => {
        Object.values(friendsData).forEach(f => {
            if (f.moving) {
                const wp = waypoints[f.targetNode];
                if (wp) {
                    const dx = wp.x - f.cx;
                    const dy = wp.y - f.cy;
                    const dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < 10) {
                        const neighbors = graph[f.targetNode];
                        if (neighbors && neighbors.length > 0) {
                            const next = neighbors[Math.floor(Math.random() * neighbors.length)].to;
                            if (!next.startsWith('friend-')) {
                                f.targetNode = next;
                                f.section = 'Moving through Concourse';
                            }
                        }
                    } else {
                        const speed = 2.5; 
                        f.cx += (dx / dist) * speed;
                        f.cy += (dy / dist) * speed;
                    }
                }
            }
            
            // Always maintain precise graph location
            updateFriendGraphNode(f);
            
            const ring = document.querySelector(`#friend-${f.id} .friend-ring`);
            const dot = document.querySelector(`#friend-${f.id} .friend-dot`);
            const text = document.querySelector(`#friend-${f.id} .friend-text`);
            
            if (ring && dot && text) {
                ring.setAttribute('cx', f.cx); ring.setAttribute('cy', f.cy);
                dot.setAttribute('cx', f.cx); dot.setAttribute('cy', f.cy);
                text.setAttribute('x', f.cx); text.setAttribute('y', f.cy + 5);
            }
            
            if (state.isNavigating && currentNavDestKey === destKey) {
                const oldIndex = currentRouteIndex;
                const computedRoutes = computeRoutes(destKey);
                if (computedRoutes.length > 0) {
                    currentRoutes = computedRoutes;
                    currentRouteIndex = Math.min(oldIndex >= 0 ? oldIndex : 0, currentRoutes.length - 1);
                    drawRoute(currentRoutes[currentRouteIndex], currentRoutes);
                    
                    const navEta = document.getElementById('nav-bar-eta');
                    if (navEta) navEta.textContent = `${currentRoutes[currentRouteIndex].time} min • ${currentRoutes[currentRouteIndex].dist}m`;
                    
                    showDestinationPin(destKey);
                }
            }
        });
    }, 1000);
}
// ═══════════════ INITIALIZATION ═══════════════
document.addEventListener('DOMContentLoaded', () => {
    initSplash();
    renderFoodGrid(foodItems);
    startRealtimeUpdates();
    startFriendSimulation();
    initAssistant();
});

function initSplash() {
    const splash = document.getElementById('splash-screen');
    const app = document.getElementById('app');

    setTimeout(() => {
        splash.classList.add('fade-out');
        setTimeout(() => {
            splash.style.display = 'none';
            app.classList.remove('hidden');
            app.style.display = 'flex';
        }, 600);
    }, 2800);
}

// ═══════════════ SCREEN NAVIGATION ═══════════════
function navigateToScreen(screenId, tabElement) {
    if (state.currentScreen === screenId) return;

    // Close scoped modal if leaving friends screen
    if (state.currentScreen === 'screen-friends' && screenId !== 'screen-friends') {
        closeAddFriend();
    }

    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    // Show target
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        state.currentScreen = screenId;
    }

    // Update bottom nav
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    if (tabElement) {
        tabElement.classList.add('active');
    } else {
        const tab = document.querySelector(`[data-screen="${screenId}"]`);
        if (tab) tab.classList.add('active');
    }

    // Close nav panel if open
    if (state.navPanelOpen && screenId !== 'screen-map') {
        closeNavPanel();
    }
}

// ═══════════════ MODALS ═══════════════
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('open')) {
        e.target.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// ═══════════════ FOOD ORDERING ═══════════════
function renderFoodGrid(items) {
    const grid = document.getElementById('food-grid');
    if (!grid) return;

    grid.innerHTML = items.map(item => {
        // High-end image rendering with immediate fallback redundancy
        const imageContent = item.image
            ? `<img src="${item.image}" alt="${item.name}" class="food-card-image" loading="lazy" 
                onerror="this.parentElement.innerHTML='<div class=\'food-card-placeholder\' style=\'background:${item.gradient || 'linear-gradient(135deg, #1e1e3f, #2d2d5a)'}\'><span class=\'placeholder-emoji\'>${item.emoji || '🍽'}</span></div>'">` 
            : `<div class="food-card-placeholder" style="background:${item.gradient || 'var(--bg-elevated)'}">
                <span class="placeholder-emoji">${item.emoji || '🍽'}</span>
               </div>`;

        return `
            <div class="food-card ${!item.available ? 'food-unavailable' : ''}" data-category="${item.category}">
                ${!item.available ? '<span class="unavailable-badge">Sold Out</span>' : ''}
                <div class="food-card-img-wrapper">
                    ${imageContent}
                    <div class="food-image-overlay"></div>
                    ${item.available ? `<button class="add-to-cart-btn" onclick="addToCart(${item.id})" aria-label="Add ${item.name} to cart">
                        <span class="material-symbols-rounded">add</span>
                    </button>` : ''}
                </div>
                <div class="food-card-body">
                    <div class="food-header-row">
                        <span class="food-card-name">${item.name}</span>
                        <span class="food-card-price">₹${item.price}</span>
                    </div>
                    <span class="food-card-desc">${item.desc}</span>
                    <div class="food-card-footer">
                        <span class="food-card-stall"><span class="material-symbols-rounded">storefront</span>${item.stall}</span>
                        <span class="food-card-time"><span class="material-symbols-rounded">schedule</span>${item.prepTime}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterCategory(category, btn) {
    // Update active button
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const filtered = category === 'all' ? foodItems : foodItems.filter(f => f.category === category);
    renderFoodGrid(filtered);
}

function filterFood(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderFoodGrid(foodItems);
        return;
    }
    const filtered = foodItems.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.desc.toLowerCase().includes(q)
    );
    renderFoodGrid(filtered);
}

function addToCart(itemId) {
    const item = foodItems.find(f => f.id === itemId);
    if (!item) return;

    const existing = state.cart.find(c => c.id === itemId);
    if (existing) {
        existing.qty++;
    } else {
        state.cart.push({ ...item, qty: 1 });
    }

    updateCartUI();
    showToast(`${item.name} added to cart!`, 'check_circle');
}

function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update badge
    const badge = document.getElementById('cart-badge');
    if (badge) badge.textContent = totalItems;

    // Update cart modal
    const cartItemsEl = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotal = document.getElementById('cart-total-amount');

    if (state.cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = '';
        if (cartFooter) cartFooter.style.display = 'none';
        if (cartItemsEl) {
            cartItemsEl.innerHTML = `<div class="cart-empty" id="cart-empty">
                <span class="material-symbols-rounded">remove_shopping_cart</span>
                <p>Your cart is empty</p>
                <span class="cart-empty-sub">Browse food items and add to cart</span>
            </div>`;
        }
    } else {
        if (cartFooter) cartFooter.style.display = '';
        if (cartTotal) cartTotal.textContent = `₹${totalPrice}`;

        if (cartItemsEl) {
            cartItemsEl.innerHTML = state.cart.map(item => `
                <div class="cart-item">
                    ${item.image
                        ? `<img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.style.background='${item.gradient || '#1a1a2e'}';this.style.fontSize='24px';this.innerText='${item.emoji || '🍽'}';">`
                        : `<div class="cart-item-img" style="background:${item.gradient};display:flex;align-items:center;justify-content:center;font-size:24px;">${item.emoji || '🍽'}</div>`
                    }
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">₹${item.price}</span>
                    </div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function changeQty(itemId, delta) {
    const item = state.cart.find(c => c.id === itemId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        state.cart = state.cart.filter(c => c.id !== itemId);
    }
    updateCartUI();
}

function placeOrder() {
    if (state.cart.length === 0) return;

    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    
    const newOrder = {
        id: orderId,
        items: [...state.cart.map(item => ({...item}))],
        total: totalPrice,
        date: 'Apr 14, 2026',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Preparing',
        stall: state.cart[0].stall || 'Food Court 1'
    };

    state.orderHistory.unshift(newOrder); // Add to beginning
    state.orderPlaced = true;
    state.cart = [];
    updateCartUI();
    closeModal('cart-modal');

    // Show order status
    const orderStatus = document.getElementById('order-status');
    if (orderStatus) orderStatus.style.display = '';

    showToast('Order placed successfully! 🎉', 'check_circle');

    // Simulate order progress
    setTimeout(() => {
        const activeStep = orderStatus.querySelector('.progress-step.active');
        const nextLine = activeStep?.nextElementSibling;
        if (activeStep) {
            activeStep.classList.remove('active');
            activeStep.classList.add('completed');
        }
        if (nextLine) nextLine.classList.add('completed');
        const readyStep = orderStatus.querySelector('.progress-step:last-child');
        if (readyStep) readyStep.classList.add('active');

        const etaEl = document.getElementById('order-eta-time');
        if (etaEl) etaEl.textContent = 'now! 🎉';

        showToast('Your order is ready for pickup! 🍔', 'check_circle');
        
        // Update status in history too
        newOrder.status = 'Ready for Pickup';
        renderOrders(); // Refresh list if screen is open
    }, 15000);
}

function openOrdersScreen() {
    navigateToScreen('screen-orders');
    renderOrders();
}

function renderOrders() {
    const container = document.getElementById('orders-list');
    if (!container) return;

    if (state.orderHistory.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><span class="material-symbols-rounded">receipt_long</span></div>
                <h3>No orders yet</h3>
                <p>Your past orders will appear here</p>
                <button class="btn-primary" onclick="navigateToScreen('screen-order')">Order Food Now</button>
            </div>
        `;
        return;
    }

    container.innerHTML = state.orderHistory.map(order => `
        <div class="order-history-card" onclick="viewOrderDetail('${order.id}')">
            <div class="order-h-header">
                <span class="order-h-id">${order.id}</span>
                <span class="order-h-status status-${order.status.toLowerCase().replace(/ /g, '-')}">${order.status}</span>
            </div>
            <div class="order-h-body">
                <p class="order-h-items">${order.items.map(i => i.name).join(', ')}</p>
                <div class="order-h-meta">
                    <span>${order.date} • ${order.time}</span>
                    <span class="order-h-total">₹${order.total}</span>
                </div>
            </div>
            <div class="order-h-footer">
                <span class="material-symbols-rounded">chevron_right</span>
            </div>
        </div>
    `).join('');
}

function viewOrderDetail(id) {
    const order = state.orderHistory.find(o => o.id === id);
    if (!order) return;

    const modal = document.getElementById('order-detail-screen');
    const content = document.getElementById('order-detail-content');
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="order-detail-card">
            <div class="o-status-banner status-${order.status.toLowerCase().replace(/ /g, '-')}">
                <span class="material-symbols-rounded">info</span>
                <span>Current Status: ${order.status}</span>
            </div>
            
            <div class="o-section">
                <h3 class="o-sec-title">Order Info</h3>
                <p>Order ID: <strong>${order.id}</strong></p>
                <p>Date: ${order.date} • ${order.time}</p>
                <p>Pickup: <strong>${order.stall}</strong></p>
            </div>

            <div class="o-divider"></div>

            <div class="o-section">
                <h3 class="o-sec-title">Items Ordered</h3>
                <div class="o-items-list">
                    ${order.items.map(item => `
                        <div class="o-item">
                            <span class="o-item-name">${item.qty}x ${item.name}</span>
                            <span class="o-item-price">₹${item.price * item.qty}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="o-divider"></div>

            <div class="o-total-row">
                <span>Total Amount Paid</span>
                <span>₹${order.total}</span>
            </div>
            
            <p class="o-payment-info">Paid via UPI • Transaction ID: ARENA-${Math.floor(Math.random()*1000000)}</p>
        </div>

        <div class="order-actions">
            <button class="o-action-btn" onclick="showToast('Invoice downloaded', 'download')">
                <span class="material-symbols-rounded">download</span>
                <span>Download Invoice</span>
            </button>
            <button class="o-action-btn btn-primary" onclick="navigateToScreen('screen-order')">
                <span>Order Again</span>
            </button>
        </div>
    `;

    modal.classList.add('active');
}

function closeOrderDetail() {
    const modal = document.getElementById('order-detail-screen');
    if (modal) modal.classList.remove('active');
}

// ═══════════════ MAP MODE SWITCHING ═══════════════
function switchMapMode(mode) {
    const infoLayer = document.getElementById('info-layer');
    const heatLayer = document.getElementById('heatmap-layer');
    const infoBtn = document.getElementById('mode-info-btn');
    const heatBtn = document.getElementById('mode-heat-btn');
    const legendTitle = document.getElementById('legend-title');
    const legendItems = document.getElementById('legend-items');

    state.mapMode = mode;

    if (mode === 'info') {
        infoLayer.style.display = '';
        heatLayer.style.display = 'none';
        infoBtn.classList.add('active');
        heatBtn.classList.remove('active');
        legendTitle.textContent = 'Points of Interest';
        legendItems.innerHTML = `
            <span class="legend-item"><span class="legend-dot" style="background:#ff6d00"></span>Food</span>
            <span class="legend-item"><span class="legend-dot" style="background:#7c4dff"></span>WC</span>
            <span class="legend-item"><span class="legend-dot" style="background:#448aff"></span>Gate</span>
            <span class="legend-item"><span class="legend-dot" style="background:#00e676"></span>You</span>
        `;
    } else {
        infoLayer.style.display = 'none';
        heatLayer.style.display = '';
        infoBtn.classList.remove('active');
        heatBtn.classList.add('active');
        legendTitle.textContent = 'Crowd Density';
        legendItems.innerHTML = `
            <span class="legend-item"><span class="legend-dot" style="background:#00e676"></span>Low</span>
            <span class="legend-item"><span class="legend-dot" style="background:#ffeb3b"></span>Medium</span>
            <span class="legend-item"><span class="legend-dot" style="background:#ff9100"></span>High</span>
            <span class="legend-item"><span class="legend-dot" style="background:#ff1744"></span>V.High</span>
        `;
    }
}

// ═══════════════ POI INFO CARD ═══════════════
let currentPOIKey = null;

function selectMapPOI(poiKey) {
    const poi = poiData[poiKey];
    if (!poi) return;

    currentPOIKey = poiKey;
    const card = document.getElementById('poi-info-card');
    document.getElementById('poi-card-icon').textContent = poi.icon;
    document.getElementById('poi-card-name').textContent = poi.name;
    document.getElementById('poi-card-sub').textContent = poi.sub;

    // Compute distance/time
    const destNode = poi.walkNode;
    const route = dijkstra('user', destNode, e => e.dist);
    let distM = 0, timeM = 0;
    if (route) {
        const d = computePathDistance(route.path);
        distM = Math.round(d * 0.8);
        timeM = distToWalkTime(d);
    }

    const crowdClass = poi.crowd === 'Low' ? 'crowd-low' : poi.crowd === 'Moderate' || poi.crowd === 'Medium' ? 'crowd-med' : 'crowd-high';

    document.getElementById('poi-card-meta').innerHTML = `
        <span class="poi-meta-tag"><span class="material-symbols-rounded">schedule</span>~${timeM} min</span>
        <span class="poi-meta-tag"><span class="material-symbols-rounded">straighten</span>${distM}m</span>
        <span class="poi-meta-tag ${crowdClass}"><span class="material-symbols-rounded">group</span>${poi.crowd}</span>
    `;

    card.classList.add('visible');

    // Highlight section if applicable
    document.querySelectorAll('.section').forEach(s => s.classList.remove('section-selected'));
    if (poiKey.startsWith('section-')) {
        const sectionLetter = poiKey.split('-')[1].toUpperCase();
        const sectionEl = document.querySelector(`[data-section="${sectionLetter}"]`);
        if (sectionEl) sectionEl.classList.add('section-selected');
    }
    
    // Clear friend selections
    document.querySelectorAll('.friend-marker').forEach(m => m.classList.remove('friend-selected'));
}

function closePOICard() {
    const card = document.getElementById('poi-info-card');
    if (card) card.classList.remove('visible');
    currentPOIKey = null;
    
    document.querySelectorAll('.section').forEach(s => s.classList.remove('section-selected'));
    document.querySelectorAll('.friend-marker').forEach(m => m.classList.remove('friend-selected'));
    
    // reset poi-card-icon style incase it was modified by friend card
    const icon = document.getElementById('poi-card-icon');
    if (icon) {
        icon.style.background = '';
        icon.style.color = '';
    }
}

function navigateFromPOICard() {
    if (!currentPOIKey) return;
    
    if (currentPOIKey.startsWith('friend-')) {
        const friendId = currentPOIKey.split('-')[1];
        const f = friendsData[friendId];
        closePOICard();
        if (f) startNavigationToDest(`friend-${friendId}`, f.name);
        return;
    }

    const poi = poiData[currentPOIKey];
    if (poi && poi.walkNode) {
        closePOICard();
        startNavigationToDest(poi.walkNode, poi.name);
    }
}

// ═══════════════ NAVIGATION SYSTEM ═══════════════
let currentRoutes = [];
let currentRouteIndex = 0;
let currentNavDestKey = null;

function triggerNavigation(navKey) {
    const destKey = navKeyToDest[navKey];
    const destName = navKeyToName[navKey] || navKey;
    if (!destKey) return;
    closeNavPanel();
    startNavigationToDest(destKey, destName);
}

function startNavigationToDest(destKey, destName) {
    currentNavDestKey = destKey;
    currentRoutes = computeRoutes(destKey);
    currentRouteIndex = 0;

    if (currentRoutes.length === 0) {
        showToast('No route found', 'error');
        return;
    }

    state.isNavigating = true;
    drawRoute(currentRoutes[0], currentRoutes);
    showDestinationPin(destKey);

    // Show active nav bar
    const navBar = document.getElementById('active-nav-bar');
    const navDest = document.getElementById('nav-bar-dest');
    const navEta = document.getElementById('nav-bar-eta');

    if (navBar) navBar.classList.add('visible');
    if (navDest) navDest.textContent = destName;
    if (navEta) navEta.textContent = `${currentRoutes[0].time} min • ${currentRoutes[0].dist}m`;

    // Hide quick actions while navigating
    const quickActions = document.getElementById('map-quick-actions');
    if (quickActions) quickActions.classList.add('hidden-nav');

    showToast(`Navigating to ${destName}`, 'navigation');
}

function drawRoute(primaryRoute, allRoutes) {
    // Clear all routes
    for (let i = 1; i <= 3; i++) {
        const el = document.getElementById(`nav-route-${i}`);
        if (el) {
            el.setAttribute('d', '');
            el.style.opacity = '0';
        }
    }

    // Draw primary route
    const r1El = document.getElementById('nav-route-1');
    if (r1El && primaryRoute) {
        r1El.setAttribute('d', primaryRoute.svgPath);
        r1El.setAttribute('stroke', primaryRoute.color);
        r1El.setAttribute('stroke-width', primaryRoute.strokeW);
        r1El.setAttribute('stroke-dasharray', primaryRoute.dashArr || '');
        r1El.style.opacity = '1';
    }

    // Draw alternative routes (dimmer)
    if (allRoutes) {
        allRoutes.forEach((r, idx) => {
            if (idx === 0) return; // skip primary
            if (idx > 2) return; // max 3 routes
            const el = document.getElementById(`nav-route-${idx + 1}`);
            if (el) {
                el.setAttribute('d', r.svgPath);
                el.setAttribute('stroke', r.color);
                el.setAttribute('stroke-width', r.strokeW);
                el.setAttribute('stroke-dasharray', r.dashArr || '');
                el.style.opacity = '0.35';
            }
        });
    }
}

function showDestinationPin(destKey) {
    const pin = document.getElementById('nav-dest-pin');
    const pulse = document.getElementById('nav-dest-pulse');
    const dot = document.getElementById('nav-dest-dot');
    const wp = waypoints[destKey];
    if (!pin || !wp) return;

    pin.style.display = '';
    pulse.setAttribute('cx', wp.x);
    pulse.setAttribute('cy', wp.y);
    dot.setAttribute('cx', wp.x);
    dot.setAttribute('cy', wp.y);
}

function hideDestinationPin() {
    const pin = document.getElementById('nav-dest-pin');
    if (pin) pin.style.display = 'none';
}

function stopNavigation() {
    state.isNavigating = false;

    for (let i = 1; i <= 3; i++) {
        const el = document.getElementById(`nav-route-${i}`);
        if (el) {
            el.style.opacity = '0';
        }
    }

    hideDestinationPin();

    const navBar = document.getElementById('active-nav-bar');
    if (navBar) navBar.classList.remove('visible');

    const quickActions = document.getElementById('map-quick-actions');
    if (quickActions) quickActions.classList.remove('hidden-nav');

    closeRouteOptions();
    currentRoutes = [];
    currentNavDestKey = null;

    showToast('Navigation stopped', 'close');
}

// ═══════════════ ROUTE OPTIONS PANEL ═══════════════
function showRouteSwitch() {
    if (currentRoutes.length <= 1) {
        showToast('Only one route available', 'info');
        return;
    }
    const panel = document.getElementById('route-options-panel');
    const list = document.getElementById('route-options-list');
    if (!panel || !list) return;

    list.innerHTML = currentRoutes.map((r, idx) => `
        <button class="route-option-card ${idx === currentRouteIndex ? 'selected' : ''}" onclick="selectRoute(${idx})">
            <div class="route-option-color" style="background:${r.color};"></div>
            <div class="route-option-info">
                <span class="route-option-label">${r.label}</span>
                <span class="route-option-detail">${r.time} min • ${r.dist}m</span>
            </div>
            ${idx === currentRouteIndex ? '<span class="material-symbols-rounded route-check">check_circle</span>' : ''}
        </button>
    `).join('');

    panel.classList.add('open');
}

function selectRoute(idx) {
    if (idx >= currentRoutes.length) return;
    currentRouteIndex = idx;
    const route = currentRoutes[idx];

    drawRoute(route, currentRoutes);

    // Update nav bar
    const navEta = document.getElementById('nav-bar-eta');
    if (navEta) navEta.textContent = `${route.time} min • ${route.dist}m`;

    closeRouteOptions();
    showToast(`Switched to ${route.label.replace(/[^\w\s]/g, '').trim()}`, 'alt_route');
}

function closeRouteOptions() {
    const panel = document.getElementById('route-options-panel');
    if (panel) panel.classList.remove('open');
}

// ═══════════════ QUICK NAVIGATE BUTTONS ═══════════════
function quickNavigate(type) {
    switch(type) {
        case 'washroom':
            startNavigationToDest('wr1', 'Nearest Washroom');
            break;
        case 'food':
            startNavigationToDest('food1', 'Food Court 1');
            break;
        case 'seat':
            startNavigationToDest('seat', 'My Seat B14-7');
            break;
        case 'exit':
            startNavigationToDest('gateD', 'Gate D (Exit)');
            break;
    }
}

// ═══════════════ MAP SEARCH & NAVIGATION ═══════════════
function openMapSearch() {
    openModal('map-search-modal');
    setTimeout(() => {
        const input = document.getElementById('map-search-input');
        if (input) input.focus();
    }, 400);
}

function handleMapSearch(query) {
    const results = document.querySelectorAll('.search-result-item');
    const q = query.toLowerCase().trim();
    results.forEach(r => {
        const name = r.querySelector('.sr-name')?.textContent.toLowerCase() || '';
        const detail = r.querySelector('.sr-detail')?.textContent.toLowerCase() || '';
        r.style.display = (name.includes(q) || detail.includes(q) || !q) ? '' : 'none';
    });
}

function goToDestination(dest) {
    closeModal('map-search-modal');
    navigateToScreen('screen-map');

    let destKey = null;
    let destName = dest;
    if (dest.toLowerCase().includes('seat')) { destKey = 'seat'; destName = 'My Seat B14-7'; }
    else if (dest.includes('Food Court 1')) { destKey = 'food1'; destName = 'Food Court 1'; }
    else if (dest.includes('Food Court 2')) { destKey = 'food2'; destName = 'Food Court 2'; }
    else if (dest.includes('Washroom 1') || dest.includes('Nearest Washroom')) { destKey = 'wr1'; destName = 'Washroom 1'; }
    else if (dest.includes('Washroom 2')) { destKey = 'wr2'; destName = 'Washroom 2'; }
    else if (dest.includes('Washroom 3')) { destKey = 'wr3'; destName = 'Washroom 3'; }
    else if (dest.includes('Gate A')) { destKey = 'gateA'; destName = 'Gate A'; }
    else if (dest.includes('Gate D')) { destKey = 'gateD'; destName = 'Gate D'; }
    else if (dest.includes('Parking')) { destKey = 'parkA'; destName = 'Parking Zone A'; }

    if (destKey) {
        setTimeout(() => startNavigationToDest(destKey, destName), 500);
    } else {
        showToast(`Navigating to ${dest}`, 'navigation');
    }
}

function openNavPanel() {
    const panel = document.getElementById('nav-panel');
    if (panel) {
        panel.classList.add('open');
        state.navPanelOpen = true;
    }
}

function closeNavPanel() {
    const panel = document.getElementById('nav-panel');
    if (panel) {
        panel.classList.remove('open');
        state.navPanelOpen = false;
    }
}

function toggleNavPanel() {
    state.navPanelOpen ? closeNavPanel() : openNavPanel();
}

// Legacy compatibility
function startNavigation(routeKey) {
    const destKey = navKeyToDest[routeKey];
    const destName = navKeyToName[routeKey] || routeKey;
    if (destKey) {
        closeNavPanel();
        startNavigationToDest(destKey, destName);
    }
}

function navigateToSeat() {
    navigateToScreen('screen-map');
    setTimeout(() => startNavigationToDest('seat', 'My Seat B14-7'), 500);
}

function centerOnUser() {
    showToast('Centered on your location', 'my_location');
}

function toggleFriends() {
    state.friendsVisible = !state.friendsVisible;
    const layer = document.getElementById('friends-layer');
    if (layer) {
        layer.style.opacity = state.friendsVisible ? '1' : '0';
        layer.style.pointerEvents = state.friendsVisible ? 'auto' : 'none';
    }
    showToast(state.friendsVisible ? 'Friends visible' : 'Friends hidden', 'group');
}

function showFriendOnMap(friendId) {
    const f = friendsData[friendId];
    if (!f) return;

    currentPOIKey = `friend-${friendId}`;
    
    document.getElementById('poi-card-icon').style.background = f.color;
    document.getElementById('poi-card-icon').style.color = 'white';
    document.getElementById('poi-card-icon').innerHTML = `<span class="material-symbols-rounded">person</span>`;
    
    document.getElementById('poi-card-name').textContent = f.name;
    document.getElementById('poi-card-sub').textContent = `Live Location • ${f.section}`;

    // Compute route directly natively
    const destKey = `friend-${friendId}`;
    const route = dijkstra('user', destKey, e => e.dist);
    let distM = 0, timeM = 0;
    if (route) {
        const d = computePathDistance(route.path);
        distM = Math.round(d * 0.8);
        timeM = distToWalkTime(d);
    }

    document.getElementById('poi-card-meta').innerHTML = `
        <span class="poi-meta-tag"><span class="material-symbols-rounded">schedule</span>~${timeM} min</span>
        <span class="poi-meta-tag"><span class="material-symbols-rounded">straighten</span>${distM}m</span>
        <span class="poi-meta-tag crowd-low"><span class="material-symbols-rounded">sensors</span>Live Tracking</span>
    `;

    document.getElementById('poi-navigate-btn').style.display = 'none';
    
    showPOICard();

    document.querySelectorAll('.friend-marker').forEach(m => m.classList.remove('friend-selected', 'marker-blink'));
    const marker = document.getElementById(`friend-${friendId}`);
    if (marker) {
        marker.classList.add('friend-selected', 'marker-blink');
        // Stop blinking after 6 seconds
        setTimeout(() => marker.classList.remove('marker-blink'), 6000);
    }

    navigateToScreen('screen-map');
}


// ═══════════════ EMERGENCY ═══════════════
function triggerEmergency() {
    const main = document.getElementById('emergency-main');
    const sent = document.getElementById('emergency-sent');

    if (main) main.style.display = 'none';
    if (sent) sent.style.display = '';

    // Vibration feedback
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}

function resetEmergency() {
    const main = document.getElementById('emergency-main');
    const sent = document.getElementById('emergency-sent');

    if (main) main.style.display = '';
    if (sent) sent.style.display = 'none';
}

// ═══════════════ CHAT / AI ASSISTANT ═══════════════
function initAssistant() {
    const container = document.getElementById('chat-container');
    if (container) container.innerHTML = '';
    renderAssistantStep('start');
}

function renderAssistantStep(flowKey) {
    const step = assistantFlows[flowKey];
    if (!step) return;

    addAssistantMessage(step.text, step.options);
}

function handleAssistantAction(action, label) {
    // Show user choice
    addAssistantMessage(label, [], 'user');

    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();

        if (action === 'contact_staff') {
            const resp = assistantResponses['contact_staff_alerted'];
            addAssistantMessage(resp.text, resp.options);
            // Optionally trigger a real system alert/vibration
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            return;
        }

        // Action-based transitions
        if (action.startsWith('nav_')) {
            const resp = assistantResponses[action];
            if (resp) {
                addAssistantMessage(resp.text, resp.options);
            } else {
                addAssistantMessage("I'll help you navigate there.", [{ label: '🚀 Start Navigation', action: 'trigger_' + action }, { label: '🏠 Main Menu', flow: 'start' }]);
            }
            return;
        }

        if (action.startsWith('trigger_')) {
            const dest = action.replace('trigger_nav_', '');
            addAssistantMessage("Starting navigation. Closing assistant...", []);
            setTimeout(() => {
                navigateToScreen('screen-map');
                if (dest === 'seat') navigateToSeat();
                else if (dest === 'washroom') startNavigationToDest('wr1', 'Washroom 1');
                else if (dest === 'medical') startNavigationToDest('medical', 'Medical Aid');
                else if (dest === 'gateA') startNavigationToDest('gateA', 'Gate A');
                else if (dest === 'gateD') startNavigationToDest('gateD', 'Gate D');
                else if (dest === 'parking') startNavigationToDest('parkB', 'Parking B-24');
            }, 800);
            return;
        }

        if (action.startsWith('friend_')) {
            const friendId = action.replace('friend_', '');
            addAssistantMessage(`Locating ${friendsData[friendId].name}...`, []);
            setTimeout(() => {
                showFriendOnMap(friendId);
            }, 800);
            return;
        }

        if (action === 'go_order') {
            navigateToScreen('screen-order');
            return;
        }
        if (action === 'go_map_heat') {
            navigateToScreen('screen-map');
            switchMapMode('heatmap');
            return;
        }
        if (action === 'go_map') {
            navigateToScreen('screen-map');
            return;
        }
        if (action === 'go_sos') {
            navigateToScreen('screen-home');
            openModal('emergency-modal');
            return;
        }

        // Default fallback
        addAssistantMessage("I'm not sure how to handle that action yet, but I can help you with other things!", assistantFlows['start'].options);
    }, 600);
}

function handleAssistantFlow(flowKey, label) {
    // Show user choice
    addAssistantMessage(label, [], 'user');

    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        renderAssistantStep(flowKey);
    }, 600);
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msg = input?.value.trim();
    if (!msg) return;

    addAssistantMessage(msg, [], 'user');
    input.value = '';

    showTypingIndicator();

    // Fallback response for free typing
    setTimeout(() => {
        removeTypingIndicator();
        addAssistantMessage("I'm better at helping you through the options below. Which category best describes your issue?", assistantFlows['start'].options);
    }, 1000);
}

function sendSuggestion(text) {
    // Legacy support for suggestions
    if (text.includes('gate')) handleAssistantFlow('exits', text);
    else if (text.includes('washroom')) handleAssistantAction('nav_washroom', text);
    else if (text.includes('seat')) handleAssistantAction('nav_seat', text);
    else if (text.includes('food')) handleAssistantAction('go_order', text);
    else sendChatMessage();
}

function handleChatKey(event) {
    if (event.key === 'Enter') sendChatMessage();
}

function addAssistantMessage(text, options = [], sender = 'bot') {
    const container = document.getElementById('chat-container');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    if (sender === 'bot') {
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/• /g, '&bull; ');

        let optionsHtml = '';
        if (options && options.length > 0) {
            optionsHtml = `<div class="assistant-options">
                ${options.map(opt => `
                    <button class="assistant-opt-btn" onclick="${opt.flow ? `handleAssistantFlow('${opt.flow}', '${opt.label}')` : `handleAssistantAction('${opt.action}', '${opt.label}')`}">
                        ${opt.label}
                    </button>
                `).join('')}
            </div>`;
        }

        msgDiv.innerHTML = `
            <div class="chat-avatar bot-avatar"><span class="material-symbols-rounded">smart_toy</span></div>
            <div class="chat-bubble">
                <p>${formattedText}</p>
                ${optionsHtml}
            </div>
        `;
    } else {
        msgDiv.innerHTML = `<div class="chat-bubble"><p>${text}</p></div>`;
    }

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('chat-container');
    if (!container) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="chat-avatar bot-avatar"><span class="material-symbols-rounded">smart_toy</span></div>
        <div class="chat-bubble">
            <div class="typing-indicator"><span></span><span></span><span></span></div>
        </div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// ═══════════════ TOAST NOTIFICATIONS ═══════════════
let toastTimeout;

function showToast(message, icon = 'check_circle') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (!toast) return;

    clearTimeout(toastTimeout);

    if (toastMsg) toastMsg.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;

    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ═══════════════ REAL-TIME UPDATES ═══════════════
let scoreEventIndex = 0;
let alertIndex = 0;

function startRealtimeUpdates() {
    // Update score every 10 seconds
    setInterval(() => {
        updateScore();
    }, 10000);

    // Update crowd alerts every 30 seconds
    setInterval(() => {
        updateCrowdAlert();
    }, 30000);
}

function updateScore() {
    // Simulate score changes
    const runOptions = [0, 1, 1, 1, 2, 2, 4, 4, 6];
    const runs = runOptions[Math.floor(Math.random() * runOptions.length)];

    state.score.team1 += runs;
    state.score.batsmanRuns += runs;
    state.score.batsmanBalls += 1;

    // Increment overs
    let overBalls = Math.round((state.score.overs % 1) * 10);
    overBalls++;
    if (overBalls >= 6) {
        state.score.overs = Math.floor(state.score.overs) + 1;
    } else {
        state.score.overs = Math.floor(state.score.overs) + overBalls / 10;
    }

    // Update UI
    const scoreEl = document.getElementById('score-team1');
    const oversEl = document.getElementById('score-overs');
    const eventEl = document.getElementById('score-event');

    if (scoreEl) scoreEl.textContent = `${state.score.team1}/${state.score.wickets1}`;
    if (oversEl) oversEl.textContent = `${state.score.overs.toFixed(1)} ov`;

    // Show events periodically
    if (scoreEventIndex < scoreEvents.length && Math.random() > 0.5) {
        if (eventEl) {
            eventEl.textContent = scoreEvents[scoreEventIndex];
            eventEl.style.animation = 'none';
            eventEl.offsetHeight; // Trigger reflow
            eventEl.style.animation = 'fadeInUp 0.5s ease';
        }
        scoreEventIndex++;
    }
}

function updateCrowdAlert() {
    const alertText = document.getElementById('alert-text');
    if (alertText && alertIndex < crowdAlerts.length) {
        alertText.textContent = crowdAlerts[alertIndex % crowdAlerts.length];
        const alertCard = document.getElementById('crowd-alert');
        if (alertCard) {
            alertCard.style.animation = 'none';
            alertCard.offsetHeight;
            alertCard.style.animation = 'slideDown 0.5s ease';
        }
        alertIndex++;
    }
}
