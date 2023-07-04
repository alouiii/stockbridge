import React, { useContext, useEffect, useState } from 'react';
import { PopulatedOffer } from '../../../api/collections/offer';
import { PopulatedAdvert } from '../../../api/collections/advert';
import { OfferModal } from '../OfferModal';
import { User } from '../../../api/collections/user';
import { OfferBarUserProfileInfo } from './UserProfileInfoBar';
//require('../offerBarStyle.scss');

type OfferBarUserProfileProps = {
    offer: PopulatedOffer;
    advert: PopulatedAdvert;
    outgoing: boolean;
};

/**
 * This is an offer bar for the userinfo page. To avoid breaking the product overview functionality. TODO: refactor
 * @param props 
 * @returns 
 */
const OfferBarUserProfile: React.FC<OfferBarUserProfileProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    };

    const closeModalOnSave = () => {
        setShowModal(false);
        //change to set Advert
        window.location.reload();
    };

    const openModal = () => {
        setShowModal(true);
    };
    const [offerer, setOfferer] = useState({} as User);
    const [offeree, setOfferee] = useState({} as User);
    useEffect(() => {
        const fetchData = () => {
            try {
                setOfferer(props.offer.offeror!);
                setOfferee(props.offer.offeree!);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div
                className=''
                style={{
                    marginBottom: "1em"
                }}
            >
                <OfferBarUserProfileInfo
                    onClick={openModal}
                    picture = {props.advert.imageurl}
                    advert={props.advert}
                    offer={props.offer}
                    outgoing = {props.outgoing}
                    // contentLine1={
                    //     <>
                    //         <BodyText
                    //             style={{
                    //                 font: 'light',
                    //                 fontFamily: 'Poppins',
                    //                 color: 'black',
                    //             }}
                    //         >
                    //             {/* The state does not work properly, this is a workaround that issue */}
                    //             {props.offer.offeror?.name ?? 'No Name given'} 
                    //             {Ratings(props.offer.offeror?.rating ?? 0)}
                    //         </BodyText>
                    //         <BodyText
                    //             style={{
                    //                 font: 'light',
                    //                 fontFamily: 'Poppins',
                    //                 color: 'black',
                    //             }}
                    //         >
                    //             {props?.offer?.createdAt?.toString().slice(0, 10)}
                    //         </BodyText>
                    //     </>
                    // }
                    // contentLine2={
                    //     <div
                    //         style={{
                    //             display: 'flex',
                    //             flexDirection: 'row',
                    //             alignItems: 'center',
                    //             justifyContent: 'center',
                    //             marginLeft: '10%',
                    //         }}
                    //     >
                    //         <ProductAttribute
                    //             name="Quantity"
                    //             value={props?.offer?.quantity}
                    //             unit="pcs"
                    //         />
                    //         <ProductAttribute
                    //             name="Price"
                    //             value={props?.offer?.price}
                    //             unit="€"
                    //         />
                    //     </div>
                    // }
                />
                {showModal && (
                    <OfferModal
                        isShowing={showModal}
                        onClose={closeModal}
                        onSave={closeModalOnSave}
                        advert={props.advert}
                        offer={props.offer}
                        storeName={offeree.name!}
                        rating={offeree.rating!}
                    />
                )}
            </div>
        </>
    );
};

export { OfferBarUserProfile };
