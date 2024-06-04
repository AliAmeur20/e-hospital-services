const data = {
    locations: [
        { id: 'location1', name: 'Hôpital Central - Bâtiment A', rooms: ['Salle 101', 'Salle 201', 'Salle 301'] },
        { id: 'location2', name: 'Hôpital Central - Bâtiment B', rooms: ['Salle 102', 'Salle 202', 'Salle 302'] },
        { id: 'location3', name: 'Hôpital Central - Bâtiment C', rooms: ['Salle 103', 'Salle 203'] },
        { id: 'location4', name: 'Hôpital Central - Bâtiment D', rooms: ['Salle 104', 'Salle 204'] },
    ],
    rooms: {
        'Salle 101': { name: 'Salle 101', dropes: ['armoire 101', 'armoire 201', 'armoire 301', 'armoire 401', 'armoire 501'] },
        'Salle 201': { name: 'Salle 201', dropes: ['armoire 102', 'armoire 202', 'armoire 302', 'armoire 402', 'armoire 502'] },
        'Salle 301': { name: 'Salle 301', dropes: ['armoire 103', 'armoire 203', 'armoire 303', 'armoire 403', 'armoire 503'] },
        'Salle 102': { name: 'Salle 102', dropes: ['armoire 104', 'armoire 204', 'armoire 304', 'armoire 404', 'armoire 504'] },
        'Salle 202': { name: 'Salle 202', dropes: ['armoire 105', 'armoire 205', 'armoire 305', 'armoire 405', 'armoire 505'] },
        'Salle 302': { name: 'Salle 302', dropes: ['armoire 106', 'armoire 206', 'armoire 306', 'armoire 406', 'armoire 506'] },
        'Salle 103': { name: 'Salle 103', dropes: ['armoire 107', 'armoire 207', 'armoire 307', 'armoire 407', 'armoire 507'] },
        'Salle 203': { name: 'Salle 203', dropes: ['armoire 108', 'armoire 208', 'armoire 308', 'armoire 408', 'armoire 508'] },
        'Salle 104': { name: 'Salle 104', dropes: ['armoire 109', 'armoire 209', 'armoire 309', 'armoire 409', 'armoire 509'] },
        'Salle 204': { name: 'Salle 204', dropes: ['armoire 110', 'armoire 210', 'armoire 310', 'armoire 410', 'armoire 510'] },
    },
};

export default data;