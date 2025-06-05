import { TabType } from "@/src/lib/headerConstants";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface DrawerListProps {
  toggleDrawer: (open: boolean) => () => void;
  menu: TabType;
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

        {menu.map((tap, index) => (
          <Link
            href={tap.href}
            key={index}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={tap.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};
