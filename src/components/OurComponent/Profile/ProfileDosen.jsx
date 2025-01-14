const DataProfileDosen = () => {
    const [profile, setProfile] = useState({
      name: '',
      role: 'Dosen',
      institution: 'Universitas Jember'
    })
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    const getInitials = (name) => {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };
  
    const fetchProfile = async () => {
        try {
          setLoading(true);
          const data = await getProfile();
          setProfile({
            name: data.name,
            role: 'Dosen',
            institution: 'Universitas Jember'
          });
          setError('');
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchProfile();
      }, []);
  
    return (
      <div>
          <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="bg-blue-500 text-white text-xl">
                      AA
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-bold">{profile.name}</h2>
                  <p className="text-gray-500">Dosen</p>
                  <p className="text-gray-500">Universitas Jember</p>
                </div>
              </CardContent>
          </Card>
      </div>
    );
}

export default DataProfileDosen;