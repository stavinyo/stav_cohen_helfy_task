export const formatDate = (dateString) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("he-IL", {
		dateStyle: "short",
		timeStyle: "short",
	}).format(date);
};
