import React, { ReactElement } from "react"
import Tabs from "../../ContentTabs/Tabs"
import ContentTab from "../../ContentTabs/ContentTab"


type Props = {
    children: ReactElement[]
}

/**
 * Component that displays the content of Buying section.
 */
const BuyingContent: React.FC<Props> = ({ children }) => {

    return (
        <div>
            <Tabs>
            <ContentTab title="Orders">Ciao bella, this is the container for the Orders</ContentTab>
            <ContentTab title="Incoming Offers">Hola guys, this is the container for the incoming offers</ContentTab>
            <ContentTab title="Outgoing Offers">Servus amigos, this is the container for the outgoing offers</ContentTab>
          </Tabs>
        </div>
    )
}

export default BuyingContent