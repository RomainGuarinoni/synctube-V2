import { useAuth } from '../context/AuthContext';
import { authenticatedRoute } from '../guard/authenticatedRoute';

function Index(): JSX.Element {
  return <div></div>;
}

export default authenticatedRoute(Index);
