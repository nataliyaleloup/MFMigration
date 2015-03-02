var currentToken;

/**
 * Return the current HiPer security token.
 * 
 * @returns The token to use.
 */
function getCurrentToken() {
	return currentToken;
}

/**
 * Calls the HiPer service to obtain a security token.
 * 
 * @param username username for the HiPer service
 * @param password password for the HiPer service
 * @returns json with login information
 */
function getSecurityToken(username, password) {
	var path = 'api/0-0/security/' + username + '/' + password;
	
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : path
	};
	
	return WL.Server.invokeHttp(input);
}

/**
 * Calls the HiPer service to obtain the profile for the given id.
 * 
 * @param profileId profile id
 * @returns json with profile information
 */
function getProfileById(profileId) {
	var path = 'api/' + getCurrentToken() + '/Profile/' + profileId;
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : path
	};
	
	return WL.Server.invokeHttp(input);
}

/**
 * Calls the HiPer service to obtain the contracts for a given profile.
 * 
 * @param profileId profile id
 * @returns json with contracts information
 */
function getContractsByProfileId(profileId) {
	var path = 'api/' + getCurrentToken() + '/Profile/' + profileId + '/contracts';
	
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : path
	};
	
	return WL.Server.invokeHttp(input);
}

/**
 * Calls the HiPer service to obtain a specific contract for a given profile.
 * 
 * @param profileId profile id
 * @param contractId contract id
 * @returns json with contract information
 */
function getContractByProfileIdAndContractId(profileId, contractId) {
	var path = 'api/' + getCurrentToken() + '/Profile/' + profileId + '/contracts/' + contractId;
	
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : path
	};
	
	return WL.Server.invokeHttp(input);
}

/**
 * Tell the front end that authentication credentials are required.
 * 
 * @param headers
 * @param errorMessage The error message to present to the end user.
 * @returns A object {authRequired, errorMessage} where authRequired is true if authentication is needed. The
 * errorMessage property is populated if there is an error message to report to the end user. 
 */
function onAuthRequired(headers, errorMessage) {
	errorMessage = errorMessage ? errorMessage : null;
	return {
		authRequired : true,
		errorMessage : errorMessage
	};
}

/**
 * Process the username and password sent in order to authenticate the user.
 * 
 * @param username The username to use.
 * @param password The password to use.
 * @returns An {authRequired, errorMessage} object where authRequired is true if authentication is needed.
 */
function submitAuthentication(username, password) {
	var securityTokenResponse = getSecurityToken(username, password);
	if (securityTokenResponse && securityTokenResponse.Token && securityTokenResponse.Token.Value) {
		// A valid token value has been returned.
		currentToken = username+"-"+securityTokenResponse.Token.Value;
		var userIdentity = {
				userId : username,
				displayName : username,
		};
		WL.Server.setActiveUser("HiPerRealm", userIdentity);
		return {
			authRequired : false
		};
	}
	return onAuthRequired(null, "Invalid login credentials");
}

/**
 * Logout the current user from the realm. 
 */
function onLogout() {
	WL.Server.setActiveUser("HiPerRealm", null);
}