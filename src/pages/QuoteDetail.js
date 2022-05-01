import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { Link, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";




const QuoteDetail = () => {
    const match = useRouteMatch();

    const params = useParams();

    const { quoteId } = params;

    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }
    if (error) {
        return <p className="centered focused">
            {error}
        </p>
    }

    if (!loadedQuote.text) {
        return <div>Quote not found</div>
    }
    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={match.path} exact>

                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>Comments</Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                {/* <Route path="/quotes/:quoteId/:comments"> */}
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;