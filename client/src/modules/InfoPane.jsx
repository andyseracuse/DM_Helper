import React from 'react'
import { Grid, Container,Paper, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'reactstrap';
import InfoPaneButtons from './InfoPaneButtons'




export default function InfoPane({ setSelectedMember, selectedMember, selectedGroup, baseURL, getGroup }) {
  const useStyles = makeStyles((theme) => ({
    memberPhoto: {
      width: '100%',
      height: 'auto',
    },
    firstRow: {
      display: 'flex',
      alignItems: 'flex-end'
    },
    onBottom:{
      textDecoration: 'underlined',
      display: 'flex',
      alignItems: 'flex-end',
      height: '100%'
    },
    nextRow: {
      paddingTop: 10,
    },
    fullCenter:{
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    fullCenterNotes:{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      height: 100
    },
    charSheet:{
      border: 'solid 5px black',
      borderRadius: 25,
      height: 375,
      width: '100%',
      margin: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    charSheetActive: {
      border: 'solid 5px black',
      borderRadius: 25,
      height: 250,
      width: '100%',
      margin: 'auto',
      backgroundImage: `url("${selectedMember.characterSheetUrl}")`,
      backgroundSize: "cover"
    },
    centerOfPaneTop:{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      paddingTop: 200,
    }
  }));

  const classes = useStyles();

  if(selectedGroup.default && selectedMember.default){
    return (
      <div className={classes.centerOfPaneTop}>
        <div>
          <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-people" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          </svg>
        </div>
        <h1 className={classes.centerOfPane}>The Groups Pane</h1>
      </div>
    )
  }else if(!selectedMember.default){
    return (
      <div>
        <Container maxWidth="md">
          <Row>
            <Col xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Avatar className={classes.memberPhoto} variant="rounded" src={selectedMember.photo}></Avatar>
                </Grid>
                <Grid item xs={7}>
                  <div className={classes.onBottom}>
                    <h1>
                      {selectedMember.name}
                    </h1>
                  </div>
                </Grid>
                <Grid className={classes.nextRow} item xs={5}>
                  <h5>
                    Voice:
                  </h5>
                </Grid>
                <Grid className={classes.nextRow} item xs={7}>
                  <Paper>
                    <div className={classes.fullCenter}>
                    {selectedMember.voice ? selectedMember.voice : 'oh no! No voice!'}
                    </div>
                  </Paper>
                </Grid>
                <Grid className={classes.nextRow} item xs={5}>
                  <h5>
                    Notes:
                  </h5>
                </Grid>
                <Grid className={classes.nextRow} item xs={7}>
                  <Paper>
                    <div className={classes.fullCenterNotes}>
                      {selectedMember.notes ? selectedMember.notes : 'oh no! No notes!'}
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Col>
            <Col xs={4}>
              <InfoPaneButtons setSelectedMember={setSelectedMember} getGroup={getGroup} baseURL={baseURL} selectedMember={selectedMember}/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }else{
    return <div></div>
  }
}


