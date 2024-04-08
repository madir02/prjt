import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./UserPage.css";

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return false;
    }
    return true;
  }
  
  interface LinkTabProps {
    label?: string;
    href?: string;
    selected?: boolean;
  }
  
  function LinkTab(props: LinkTabProps) {
    return (
      <Tab
        component="a"
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          // Routing libraries handle this, you can remove the onClick handle when using them.
          if (samePageLinkNavigation(event)) {
            event.preventDefault();
          }
        }}
        aria-current={props.selected && 'page'}
        {...props}
      />
    );
  }
  
  export default function NavTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      // event.type can be equal to focus with selectionFollowsFocus.
      if (
        event.type !== 'click' ||
        (event.type === 'click' &&
          samePageLinkNavigation(
            event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
          ))
      ) {
        setValue(newValue);
      }
    };
  
    return (
      <Box sx={{ width: '300px' }}>
        <Tabs
        orientation='vertical'
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          role="navigation"
        >
          <LinkTab label="Dashboard" href="/dashboard" />
          <LinkTab label="Add notification" href="/addnotification" />
          <LinkTab label="History" href="/history" />
          <LinkTab label="Message" href="/message" />
          <LinkTab label="FAQ" href="/faq" />
        </Tabs>
      </Box>
    );
  }