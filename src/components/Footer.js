import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Footer(){
    return(
        <footer style={{textAlign: 'center'}}>
            <Card>
      <Card.Header>God Bless You</Card.Header>
      <Card.Body>
        <Card.Title>Syarat dan Ketentuan</Card.Title>
        <Card.Text>
          2024 GSJA Mertiguna Sintang
        </Card.Text>
        <Button href='/hubungi' variant="primary">Contact us</Button>
      </Card.Body>
    </Card>
        </footer>
    )
}