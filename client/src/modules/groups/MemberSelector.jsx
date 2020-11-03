import React, {useState} from 'react';
import Carousel from 'react-multi-carousel';
import { Avatar } from '@material-ui/core';
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from '@material-ui/core/styles';
import CreateMemberModal from './CreateMemberModal'

export default function MemberSelector({ group, campaign, setSelectedGroup, baseURL, chooseCampaign }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }));
  const classes = useStyles();

  const [createMemberModalActive, setCreateMemberModalActive] = useState(false)

  const toggleMemberModal = () => setCreateMemberModalActive(!createMemberModalActive)
  console.log('memberrender')
  return (
    <div>
      <CreateMemberModal 
          createMemberModalActive={createMemberModalActive}
          toggleMemberModal={toggleMemberModal}
          baseURL={baseURL}
          setSelectedGroup={setSelectedGroup}
          campaign={campaign}
          chooseCampaign={chooseCampaign}
          group={group}
      />
      <Carousel
        responsive={responsive}
      >
        { 
          group.members.map((member, index) => {
            return (
              <div className="ajs-column-flex">
                <Avatar className={classes.large}>{member.name}</Avatar>
                <p>
                  {member.name}
                </p>
              </div>
            )
          })
        }
        <div onClick={toggleMemberModal} className="ajs-column-flex">
          <Avatar className={classes.large}>+</Avatar>
          <p>
            Create New
          </p>
        </div>
      </Carousel>
    </div>
  )
}
