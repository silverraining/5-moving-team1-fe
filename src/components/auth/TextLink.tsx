import { Link, Stack, Typography } from "@mui/material";

interface TextLinkProps {
  description: string;
  link: { href: string; content: string };
}

export const TextLink = ({ description, link }: TextLinkProps) => {
  return (
    <Stack
      direction={"row"}
      spacing={"8px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography
        variant="R_20"
        sx={{ fontSize: { desktop: "20px", tablet: "12px", mobile: "12px" } }}
      >
        {description}
      </Typography>
      <Link href={link.href}>
        <Typography
          variant="SB_20"
          sx={{ fontSize: { desktop: "20px", tablet: "12px", mobile: "12px" } }}
        >
          {link.content}
        </Typography>
      </Link>
    </Stack>
  );
};
