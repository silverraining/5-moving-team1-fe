import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Image from "next/image";

interface DrawerListProps {
  toggleDrawer: (open: boolean) => () => void;
  menu: string[];
}

export const DrawerList = ({ toggleDrawer, menu }: DrawerListProps) => {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem sx={{ justifyContent: "end" }}>
          <Button onClick={toggleDrawer(false)} sx={{ borderRadius: "0px" }}>
            <Image
              width={24}
              height={24}
              src={"/Images/header/X.svg"}
              alt="close"
            />
          </Button>
        </ListItem>

        {menu.map((name, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
