import { IconButton, Stack, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { fontsize } from "../../../constants/fontsize";
import { colors } from "../../../constants/colors";
import { style } from "../../../constants/style";
import moment from "moment";

export default function ProjectCard({
    createdAt,
    projectDescription,
    projectTitle,
    updatedAt
}) {
    return (
        <Stack
            direction="row"
            sx={{
                height: "100px",
                width: "250px",
                p: "1rem 1rem",
                borderRadius: "8px",
                boxShadow: style.shadow,
                backgroundColor: "white"
            }}
        >
            <Stack
                sx={{
                    flex: "3",
                    height: "100%",
                    justifyContent: "space-between",
                }}
                direction="column"
            >
                <Stack direction="column">
                    <Typography
                        sx={{
                            fontSize: fontsize.paragraph_normal,
                            color: colors.black,
                        }}
                    >
                        {projectTitle}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: fontsize.paragraph_xsmall,
                            color: colors.grey,
                        }}
                    >
                        {projectDescription}
                    </Typography>
                </Stack>
                <Typography sx={{
                    fontSize: fontsize.paragraph_xsmall,
                    color: colors.grey,
                }}>
                    {moment(createdAt).format('DD-MM-YYYY, h:mm:ss a')}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                sx={{
                    flex: "1",
                    height: "fit-content",
                    justifyContent: "flex-end",
                }}
            >
                <IconButton color="error" size="small">
                    <DeleteOutlinedIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
}
