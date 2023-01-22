import './FAQ.css'
import FaqPortrait from '../../assets/Background/faq-portrait.jpg';
import FaqLanding from '../../assets/Background/faq-landing.jpg';

const questions = [
    {
        question: 'What do I need in order to play with amiibo?',
        answerJSX: <>
            <p className="section-question">You will need an <span className="emphasize">amiibo figure</span> or <span
                className="emphasize">card</span>,
                a <span className="emphasize">compatible game</span>, and a Nintendo Switch, Wii U, New Nintendo 3DS XL,
                or New Nintendo 2DS XL system.</p>
            <p className="section-question">For use with Nintendo 3DS, Nintendo 3DS XL and Nintendo 2DS systems, a
                Nintendo 3DS NFC
                Reader/Writer accessory is required.</p>
            <p className="section-question"><span className="emphasize">Sold separately.</span></p>
        </>,
    },
    {
        question: 'What do amiibo do?',
        answerJSX: <>
            <p className="section-question">Specific features depend on the <span
                className="emphasize">amiibo</span> and the <span
                className="emphasize">compatible game</span>. In general, some games can save game data to an amiibo.
            </p>
            <p className="section-question">Other games will give you <span
                className="emphasize">bonus content</span> just for tapping an
                amiibo to your game system’s NFC reader.</p>
        </>,
    },
    {
        question: 'How many games can I save to a single amiibo at the same time?',
        answerJSX: <>
            <p className="section-question">An amiibo can save data for one game <span
                className="emphasize">at a time</span>.</p>
            <p className="section-question">This means that game data will need to be deleted on an amiibo before it can
                be used with another
                game with <span className="emphasize">read/write</span> compatibility.</p>
        </>,
    },
    {
        question: 'Do all amiibo work with all compatible games?',
        answerJSX: <>
            <p className="section-question"><span className="emphasize">Compatibility</span> and <span
                className="emphasize">functionality</span> of
                amiibo may vary by game.</p>
        </>,
    },
    {
        question: 'Can I play as my amiibo figure as a character in the games?',
        answerJSX: <>
            <p className="section-question"><span className="emphasize">Compatibility</span> and <span
                className="emphasize">functionality</span> of
                amiibo vary by game. Some titles allow you to play as <span
                    className="emphasize">your amiibo character</span>.</p>
            <p className="section-question">For example, in <span
                className="emphasize">Super Smash Bros. Ultimate</span>, you can battle,
                train, and level up your amiibo character.</p>
        </>,
    },
    {
        question: 'What does it mean if an amiibo is Read-only or Read/Write compatible?',
        answerJSX: <>
            <p className="section-question">An amiibo-compatible game can have either <span
                className="emphasize">Read-only</span> or <span
                className="emphasize">Read/Write</span> compatibility with an amiibo.</p>
            <p className="section-question">Read-only compatible means that you can tap an amiibo to the system’s NFC
                reader to get <span
                    className="emphasize">additional content</span>. For example, the Mario amiibo figure will give you
                a special racing suit for your Mii™ character when used with the Mario Kart 8 Deluxe game.</p>
            <p className="section-question">Read/Write compatible, on the other hand, means that you can get <span
                className="emphasize">additional content <span
                className="fw-bold">and</span> save certain game data</span> to the amiibo. For example,
                you can customize your character and then save it to your Mario amiibo in Super Smash Bros. Ultimate.
            </p>
            <p className="section-question">One amiibo can hold save data for <span className="emphasize">one game at a time</span>.
                You can use an amiibo with save data on it in Read-only compatible games. That means you'll still get
                the additional content without having to use a <span className="emphasize">different amiibo!</span></p>
        </>,
    },
    {
        question: 'If I already have game data saved on my amiibo, can I still use that amiibo in other compatible games?',
        answerJSX: <>
            <p className="section-question"><span className="emphasize">Yes</span>, you can still use your amiibo to get
                bonus items in games like <span
                    className="emphasize">Mario Kart™ 8 Deluxe</span> and <span className="emphasize">The Legend of Zelda™: Breath of the Wild</span>.
            </p>
            <p className="section-question">However, for other games that save data to your amiibo (such as <span
                className="emphasize">Super Smash Bros. Ultimate</span>),
                you will need to delete any existing save data on the amiibo before using it with a new read/write
                compatible game.</p>
        </>,
    },
    {
        question: 'Can you play amiibo-compatible games without using amiibo?',
        answerJSX: <>
            <p className="section-question">You can enjoy the full game experience with all games compatible with
                amiibo <span className="emphasize">without using an amiibo figure</span>.</p>
            <p className="section-question">Using an amiibo will simply add <span
                className="emphasize">new</span> and <span className="emphasize">optional</span> elements to the
                gameplay <span className="emphasize">(depending on the game)</span>.</p>
        </>,
    },
];

const questionsSet = [
    questions.filter((q, i) => i % 2 === 0),
    questions.filter((q, i) => i % 2 !== 0),
]

function FAQ() {
    return (
        <>
            {/*<div className="container">*/}
            {/*    <div className="row py-5">*/}
            {/*        <div className="col">*/}
            {/*            <p className="h2 text-center text-uppercase fw-light faq-text">Frequently Asked Questions</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="d-md-none img-wrapper mt-3">
                <img className="mario-question-img" src={FaqPortrait} alt="Mario Question Portrait"/>
            </div>

            <div className="d-md-block d-none img-wrapper img-landing-wrapper mt-5">
                <img className="mario-question-img" src={FaqLanding} alt="Mario Question Landscape"/>
            </div>

            <div className="container">
                <div className="row mt-5 gx-md-3 gx-xl-5 mb-3 mb-md-5">
                    {
                        questionsSet.map((qColumns, iClass) => (
                            <div className={`col-12 col-md-6 ps-0 questions-column-${iClass}`} key={iClass}>
                                {
                                    qColumns.map(({question, answerJSX}, idx) => (
                                        <div className="question-wrapper" key={idx}>
                                            <div className="question-graphics">
                                                <div className="question-icon">
                                                    {/*<span className="d-md-none">*/}
                                                    {/*    <i className={`bi bi-${(idx + iClass) * 2 + 1}-square-fill`}></i>*/}
                                                    {/*</span>*/}
                                                    {/*<span className="d-md-block d-none">*/}
                                                    {/*    <i className={`bi bi-${(idx + 1) + 4 * (iClass)}-square-fill`}></i>*/}
                                                    {/*</span>*/}

                                                    <i className="bi bi-question-square-fill"></i>
                                                </div>
                                                <div className="question-line"></div>
                                            </div>
                                            <div className="question-texts ps-2 pe-3 pe-md-2 pe-xl-0 text">
                                                <div className="question fs-6 fw-bold">

                                                    <span className="d-md-none">
                                                        {'[' + ((idx + 1) + 4 * (iClass)) + '] '}
                                                    </span>
                                                    <span className="d-md-inline d-none">
                                                        {'[' + ((idx) * 2 + iClass + 1) + '] '}
                                                    </span>
                                                    {question}
                                                </div>
                                                <div className="answer text-dark fw-light">
                                                    {answerJSX}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    );
}

export default FAQ;