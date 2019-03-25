import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import routes from './routes';

import {
    Layout,
    Page,
    FooterHelp,
    Card,
    Button,
    FormLayout,
    TextField,
    AccountConnection,
    ChoiceList,
    SettingToggle,
    AppProvider,
} from '@shopify/polaris';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            email: '',
            checkboxes: [],
            connected: false,
        };
    }

    render() {
        const breadcrumbs = [{content: 'Example apps'}, {content: 'webpack'}];
        const primaryAction = {content: 'New product'};
        const secondaryActions = [{content: 'Import', icon: 'import'}];

        const choiceListItems = [
            {label: 'I accept the Terms of Service', value: 'false'},
            {label: 'I consent to receiving emails', value: 'false2'},
        ];

        return (
            <AppProvider apiKey={window.apiKey} shopOrigin={window.shopOrigin} forceRedirect={true}>
                <Router>
                    {routes}
                </Router>
            </AppProvider>
        );
    }

    valueUpdater(field) {
        return (value) => this.setState({[field]: value});
    }

    toggleConnection() {
        this.setState(({connected}) => ({connected: !connected}));
    }

    connectAccountMarkup() {
        return (
            <Layout.AnnotatedSection
                title="Account"
                description="Connect your account to your Shopify store."
            >
                <AccountConnection
                    action={{
                        content: 'Connect',
                        onAction: this.toggleConnection.bind(this, this.state),
                    }}
                    details="No account connected"
                    termsOfService={
                        <p>
                            By clicking Connect, you are accepting Sample’s{' '}
                            <Link url="https://polaris.shopify.com">
                                Terms and Conditions
                            </Link>
                            , including a commission rate of 15% on sales.
                        </p>
                    }
                />
            </Layout.AnnotatedSection>
        );
    }

    disconnectAccountMarkup() {
        return (
            <Layout.AnnotatedSection
                title="Account"
                description="Disconnect your account from your Shopify store."
            >
                <AccountConnection
                    connected
                    action={{
                        content: 'Disconnect',
                        onAction: this.toggleConnection.bind(this, this.state),
                    }}
                    accountName="Tom Ford"
                    title={<Link url="http://google.com">Tom Ford</Link>}
                    details="Account id: d587647ae4"
                />
            </Layout.AnnotatedSection>
        );
    }

    renderAccount() {
        return this.state.connected
            ? this.disconnectAccountMarkup()
            : this.connectAccountMarkup();
    }
}

export default App;