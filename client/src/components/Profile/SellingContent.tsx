import React, { ReactElement } from "react"
import Tabs from "../ContentTabs/Tabs"
import Tab from "../ContentTabs/Tab"


type Props = {
    children: ReactElement[]
}

/**
 * Component that displays the content of Selling section.
 */
const SellingContent: React.FC<Props> = ({ children }) => {

    return (
        <div>
            <Tabs>
                <Tab title="Orders">Ciao bella, this is the container for the Orders</Tab>
                <Tab title="Incoming Offers">Hola guys, this is the container for the incoming offers</Tab>
                <Tab title="Outgoing Offers">Servus amigos, this is the container for the outgoing offers</Tab>
            </Tabs>
        </div>
    )
}

export default SellingContent