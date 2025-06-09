const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddAction, setShowAddAction] = useState(false);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Actions', icon: CheckCircle, color: 'gray' },
    { id: 'recycling', name: 'Recycling', icon: CheckCircle, color: 'eco' },
    { id: 'energy', name: 'Energy', icon: CheckCircle, color: 'yellow' },
    { id: 'transportation', name: 'Transport', icon: CheckCircle, color: 'blue' },
    { id: 'water', name: 'Water', icon: CheckCircle, color: 'cyan' },
    { id: 'nature', name: 'Nature', icon: CheckCircle, color: 'green' },
    { id: 'home', name: 'Home', icon: CheckCircle, color: 'purple' }
  ];

  const [newAction, setNewAction] = useState({
    title: '',
    category: 'recycling',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0]
  });
=======
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddAction, setShowAddAction] = useState(false);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Actions', icon: CheckCircle, color: 'gray' },
    { id: 'recycling', name: 'Recycling', icon: CheckCircle, color: 'eco' },
    { id: 'energy', name: 'Energy', icon: CheckCircle, color: 'yellow' },
    { id: 'transportation', name: 'Transport', icon: CheckCircle, color: 'blue' },
    { id: 'water', name: 'Water', icon: CheckCircle, color: 'cyan' },
    { id: 'nature', name: 'Nature', icon: CheckCircle, color: 'green' },
    { id: 'home', name: 'Home', icon: CheckCircle, color: 'purple' }
  ];

  const types = [
    'Tree Plantation',
    'Bicycle Commute',
    'Carpool',
    'Energy Saving',
    'Water Conservation',
    'Recycling'
  ];

  const [newAction, setNewAction] = useState({
    title: '',
    category: 'recycling',
    type: types[0],
    points: 0,
    notes: ''
  });
