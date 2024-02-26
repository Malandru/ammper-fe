import { Alert, Box, Container, CssBaseline, Link, ThemeProvider, createTheme } from '@mui/material';
import AmmperService from './ammper/Service';

const defaultTheme = createTheme();

function ErrorAPI({ response }) {
    const msg = response.data;
    const code = response.status;
    if (code == 403) {
        console.log('dropping session');
        AmmperService.saveSession(false);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Alert severity="warning">Backend communication failed with message {msg}</Alert>
                    <Link href="/" variant="body2">
                        Go to home page
                    </Link>
                </Box>
            </Container>
        </ThemeProvider>);
}

export default ErrorAPI;