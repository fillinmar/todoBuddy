import {useState} from 'react';
import {ReactComponent as CloseButton} from '../../static/close.svg';
import {ReactComponent as Logo} from '../../static/logo.svg';
import {ReactComponent as IOSAddToHomeScreenIllustration} from '../../static/ios-add-to-home-screen.svg';
import {ReactComponent as IOSShareBtnIllustration} from '../../static/ios-share-btn.svg';
import {
    checkIsInStandaloneMode,
    checkIsIosDevice,
    checkIsSafari,
    checkIsWindowAvailable
} from "../../helpers/checkPwaFeatures";
import './InstallAppModal.css'

const InstallStep = ({children}) => (
    <li className="itemStep">{children}</li>
);

export const InstallAppModal = () => {
    const [isOpen, setIsOpen] = useState(checkIsIosDevice() && !checkIsInStandaloneMode())
    const isSafari = checkIsSafari();

    console.log('logs checkIsWindowAvailable', checkIsWindowAvailable(), 'standalone' in window.navigator , window.navigator.standalone)
    const handleModalClose = () => {
        setIsOpen(false)
    };

    if (!isOpen) {
        return
    }
    return (
        <div className={'installAppModal'}>
            <div className={'installAppModal__container'}>
                <div className={'installAppModal__content'}>

            <CloseButton onClick={handleModalClose} className={'installAppModal__cross'}></CloseButton>

            <div>
                <Logo/>
                <h1 id="modal-title" className="text-5xl font-bold">
                    Install the app
                </h1>
                {!isSafari && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-warning font-semibold">
                            Open this application using
                            <br/>
                            Safari browser to install the app.
                        </p>
                    </div>
                )}
                {isSafari && (
                    <ol className="bg-default-100 mt-5 flex flex-col gap-3 rounded-xl p-3 text-center">
                        <InstallStep>
                            Tap on <IOSShareBtnIllustration/> in the tap bar
                        </InstallStep>
                        <InstallStep>
                            Scroll and select <IOSAddToHomeScreenIllustration/>
                        </InstallStep>
                        <InstallStep>
                            Look for the <Logo/> icon on your home screen
                        </InstallStep>
                    </ol>
                )}
            </div>
                </div>
            </div>
        </div>
    );
};
