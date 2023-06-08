import React, { ReactElement } from "react"
import Tabs from "../ContentTabs/Tabs"
import Tab from "../ContentTabs/Tab"


type Props = {
    children: ReactElement[]
}

/**
 * Component that displays the content of MyAdverts section.
 */
const MyAdvertsContent: React.FC<Props> = ({ children }) => {

    return (
        <div>
            <Tabs>
                <Tab title="Buying Ads">Ciao bella, this is the container for the buying Ads</Tab>
                <Tab title="Selling Ads">Hola guys, this is the container for the selling Ads</Tab>
            </Tabs>
        </div>
    )
}

export default MyAdvertsContent