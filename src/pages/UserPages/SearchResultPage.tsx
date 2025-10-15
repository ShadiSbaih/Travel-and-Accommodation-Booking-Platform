import Navbar from '@/components/Navbar'

function SearchResultPage() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  return (
    <>
      <Navbar />
      <div>SearchResultPage</div>
    </>
  )
}

export default SearchResultPage