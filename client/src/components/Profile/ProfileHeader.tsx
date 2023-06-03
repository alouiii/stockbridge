import { palette } from "../../utils/colors";
import profilePageImage from ".//../../assets/profilePageImage.png";
import { Button } from "react-bootstrap";
import { BodyText } from "../Text/BodyText";
import { Title } from "../Text/Title";
import useMediaQuery from "@mui/material/useMediaQuery";
import { right } from "@popperjs/core";
import { relative } from "path";



export function ProfileHeader() {
    const matches = useMediaQuery("(min-width: 1200px)");

    return (
        <div
            style={{
                width: "100%",
                height: 236,
                backgroundColor: palette.imageBg,
                zIndex: 1,
            }}
        >
            <img
                style={{
                    maxWidth: "100%",
                    height: 236,
                    zIndex: -1,
                    position: "absolute",
                    objectFit: "fill",
                }}
                src={profilePageImage}
                alt="homepage"
            />

            <div className="textContainer"
                style={{
                    display: "inline-block",
                    position: "relative",
                    //marginTop: "5em",
                    //width: "30%",
                    alignContent: "left",
                    left: "35%",
                    top: "20%"
                }}
            >
                <Title
                    style={{
                        fontSize: matches ? 36 : 30,
                        color: "white",
                        whiteSpace: "pre-line",
                        textAlign: "center",
                        fontWeight: 500,
                    }}
                    message=
                    <h1>
                        Out of stock? or got
                        <br />
                        too much stock?
                        <br />
                        No worries!
                    </h1>
                />
            </div>

            <Button
                style={{
                    display: "inline-block",
                    backgroundColor: palette.subSectionsBgAccent,
                    borderColor: palette.subSectionsBgAccent,
                    borderRadius: 30,
                    width: "20%",
                    maxWidth: 260,
                    position: "relative",
                    float: "right",
                    right: "5%",
                    top: "70%"

                }}

            >
                <BodyText
                    style={{
                        margin: "auto",
                        fontSize: 15,
                        color: "white",
                        fontWeight: 600,
                    }}
                    message="POST YOUR ADVERT"
                />
            </Button>




            {/* <div className="gapHeader"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    alignItems: "flex-end",
                    marginRight: "10%",
                }}
            >
               
            </div> */}
        </div>
    );
}
