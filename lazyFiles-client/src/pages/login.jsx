import {Box, Card, CardContent, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import {loginWithGoogle} from "../services/userService.js";

export function LoginPage() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const login = async (data) => {
        const token = data.credential;
        try {
            const response = await loginWithGoogle(token);
            if (response.success) {
                window.location.href = "/";
                // Handle successful login (e.g., redirect to dashboard)
            } else {
                console.error("Login failed", response.message);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                padding: 2,
            }}
        >
            <Card elevation={3} sx={{width: isSmallScreen ? "100%" : 400}}>
                <CardContent sx={{textAlign: "center", py: 5}}>
                    <Typography variant="h5" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                        Sign in to continue
                    </Typography>

                    <GoogleOAuthProvider clientId="695770216894-cqcmmc09hi60gm99oprb4iqdii77e31u.apps.googleusercontent.com">
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <GoogleLogin
                                onSuccess={login}
                                onError={(error) => {
                                    console.log(error);
                                }}
                            />
                        </Box>
                    </GoogleOAuthProvider>
                </CardContent>
            </Card>
        </Box>
    );
}