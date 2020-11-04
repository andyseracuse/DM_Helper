import React from 'react'
import { Grid, Container,Paper, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'reactstrap'




export default function InfoPane({ selectedMember, selectedGroup }) {
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
    }
  }));

  const classes = useStyles();

  if(selectedGroup.default || selectedMember.default){
    return <div></div>
  }
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
                  {selectedMember.voice ? selectedMember.notes : 'oh no! No voice!'}
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
            {selectedMember.characterSheetUrl ? <div className={classes.charSheetActive}></div> : <div className={classes.charSheet}>No Character Sheet</div>}
          </Col>
        </Row>
      </Container>
    </div>
  )
}


