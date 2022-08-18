1. Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 
// in a single request we can send single header, but if a header already send & we again try to send another header, this
// error will arrive.
