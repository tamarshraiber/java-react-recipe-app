import { Link, useNavigate } from "react-router-dom"
import "./NavbBar.css"
import { AppDispatch, RootState } from '../store/api';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { logOut } from "../features/user/userSlice"
import { useDispatch, useSelector } from 'react-redux';




const NavBar = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.user.selectUser)

    const isConect = useSelector((state: RootState) => state.user.isConect)

    const recipeBooks = useSelector((state: RootState) => state.recipeBook.recipeBooks)


    const handleLogout = () => {
        dispatch(logOut());
        navigate("/Login");
    };

    return (
        <div >
            {isConect && (
                <AppBar position="fixed" sx={{ height: '6vh', backgroundColor: 'rgba(211, 211, 211, 0.3)', }} >
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
                        >
                            <img
                                src='../../public/image/logo.png'
                                alt="Logo"
                                style={{ height: '10vh', marginRight: '50vw', top: '2vh' }}
                            />
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                textTransform: 'none',
                                position: 'absolute',
                                top: '1.8vh',
                                left: '88vw',
                                color: 'primary.main'
                            }}
                        >
                            hello {user.firstName}
                        </Typography>
                        {user.id !== -1 && (
                            <>
                                {recipeBooks && (

                                    <Button
                                        sx={{
                                            textTransform: 'none',
                                            position: 'absolute',
                                            top: '1.8vh',
                                            left: '8vw',
                                        }}
                                    >
                                        <Link to='/recipeBook' style={{ textDecoration: 'none', color: 'inherit' }}>recipeBook</Link>
                                    </Button>
                                )}
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        position: 'absolute',
                                        top: '1.8vh',
                                        left: '20vw',
                                    }}
                                >
                                    <Link to='/home' style={{ textDecoration: 'none', color: 'inherit' }}>home</Link>
                                </Button>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        position: 'absolute',
                                        top: '1.8vh',
                                        left: '77vw',
                                    }}
                                    onClick={handleLogout}>logout</Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            )}
        </div>
    )
}
export default NavBar