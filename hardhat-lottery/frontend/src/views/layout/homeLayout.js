import React, { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { publicRoute } from '../routes';
import Header from '../../components/header';
import Footer from '../../components/footer';
export default function PublicLayout(props) {


    return (
        <React.Fragment>

            <div className='page-inner' >
                <Header />
                <main className='main-content-css'>

                    {<Suspense fallback={'props.pageLoader()'}>
                        <Switch>
                            {
                                publicRoute.map((route, idx) => {
                                    return (typeof route.component !== "undefined" ? (
                                        <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (<route.component {...props} />)} />
                                    ) : (null))
                                })
                            }
                        </Switch>
                    </Suspense>}
                </main>
                    <Footer />

                {/* <Footer /> */}
            </div>
        </React.Fragment>
    )
}