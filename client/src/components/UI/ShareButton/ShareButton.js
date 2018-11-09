import React from "react";
import {InlineReactionButtons} from 'sharethis-reactjs';
import {InlineShareButtons} from 'sharethis-reactjs';
import {StickyShareButtons} from 'sharethis-reactjs';
import {InlineFollowButtons} from 'sharethis-reactjs';

class App extends React.Component {

    render () {
        return (
            <div>
            <h1>Inline Share Buttons</h1>
                <InlineShareButtons
                    config={{
                        alignment: 'center',  // alignment of buttons (left, center, right)
                        enabled: true,        // show/hide buttons (true, false)
                        font_size: 16,        // font size for the buttons
                        labels: 'cta',        // button labels (cta, counts, null)
                        language: 'en',       // which language to use (see LANGUAGES)
                        networks: [           // which networks to include (see SHARING NETWORKS)
                            'whatsapp',
                            'linkedin',
                            'messenger',
                            'facebook',
                            'twitter'
                        ],
                        padding: 12,          // padding within buttons (INTEGER)
                        radius: 4,            // the corner radius on each button (INTEGER)
                        show_total: true,
                        size: 40,             // the size of each button (INTEGER)

                        // OPTIONAL PARAMETERS
                        url: 'https://www.sharethis.com', // (defaults to current url)
                        image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                        description: 'custom text',       // (defaults to og:description or twitter:description)
                        title: 'custom title',            // (defaults to og:title or twitter:title)
                        message: 'custom email text',     // (only for email sharing)
                        subject: 'custom email subject',  // (only for email sharing)
                        username: 'custom twitter handle' // (only for twitter sharing)
                    }}
                />
            </div>
        );
    }
};

// export
export default App;