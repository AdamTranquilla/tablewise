import React /* , { useState } */ from "react";
import Section from "./MenuSection";
import "./Menu.css";

import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   dir?: string;
//   index: any;
//   value: any;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 340,
  },
}));

export default function Menu() {
  //load menu here
  //load sections here

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  // const [selectedSection, setSection] = useState("Apps");

  const sections: string[] = ["Apps", "Mains", "Deserts", "Drinks"];

  return (
    <div id="menu-container">
      <h3>Menu</h3>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {sections.map((section) => {
              return <Tab label={section} {...a11yProps(0)} />;
            })}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {sections.map((section) => {
            return <Section sectionName={section} />;
          })}
        </SwipeableViews>
      </div>
    </div>
  );
}

/* 
export default function Menu() {
  //load menu here
  //load sections here

  const [selectedSection, setSection] = useState("Apps");

  const sections: string[] = ["Apps", "Mains", "Deserts", "Drinks"];

  return (
    <div id="menu-container">
      <h3>Menu</h3>

      <div className="cat-btns">
        {sections.map((section) => {
          return (
            <button
              value={section}
              type="button"
              onClick={() => {
                setSection(section);
              }}
              className={
                section === selectedSection ? "selected-section-button" : ""
              }
            >
              {section}
            </button>
          );
        })}
      </div>

      <Section sectionName={selectedSection} />
    </div>
  );
}
 */
