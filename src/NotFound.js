import { Alert, Box, Container, CssBaseline, Link, ThemeProvider, createTheme } from '@mui/material';

const defaultTheme = createTheme();

function NotFound({ allowed }) {
    console.log(allowed);
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
                    {
                        allowed ? (<div>
                            <Alert severity="warning">Page not found.</Alert>
                            <Link href="/" variant="body2">
                                Go to home page
                            </Link>
                        </div>
                        ) : (<div>
                            <Alert severity="error">Not allowed to access this page</Alert>
                            <Link href="/signin" variant="body2">
                                Please sign in
                            </Link></div>
                        )
                    }
                </Box>
            </Container>
        </ThemeProvider>);
}

export default NotFound;
