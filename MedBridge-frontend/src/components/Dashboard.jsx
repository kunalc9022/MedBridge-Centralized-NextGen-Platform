import { Alert, Container } from "react-bootstrap";

export function Dashboard(){
    return (
        <Container className="mt-4">
            <Alert variant="success">
                <h2>Welcome to LiveOn</h2>
            </Alert>
            <p>Live Together help together</p>
        </Container>
    )
}