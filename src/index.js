import ReactDOM from 'react-dom';
import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const Home = () => (
  <div>
    <h2>Missy's notes app</h2>
    <p>This app is for collecting notes.</p>
  </div>
);

const Note = ({ note }) => (
  <div>
    <h2>{note.content}</h2>
    <div>{note.user}</div>
    <div><strong>{note.important ? 'important' : ''}</strong></div>
  </div>
);

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

const Users = () => (
  <div>
    <h2>Missy's notes app</h2>
    <ul>
      <li>Tubster Lovegren</li>
      <li>Nubster Lovegren</li>
      <li>Chubster Lovegren</li>
    </ul>
  </div>
);

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin('missy');
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <div>
          <Button type="submit" primary=''>login</Button>
        </div>
      </form>
    </div>
  );
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Chubster Lovegren'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Chubster Lovegren'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Nubster Lovegren'
    }
  ]);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const padding = {
    padding: 5,
  };

  const match = useMatch('/notes/:id');
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null;

  return (
    <Page>
      <div>
        {(message &&
          <Alert severity="success">
            {message}
          </Alert>
        )}
      </div>

      <Navigation>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </Navigation>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer>
        <br />
        <em>Notes app, Missy's desk, 2022</em>
      </Footer>
    </Page>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);