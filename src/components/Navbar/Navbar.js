import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clearCurrentUser} from "../../redux/store/actions/users";


const Navbar = ({links}) => {
    const currentUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate("/login");
    }

}

export default Navbar;