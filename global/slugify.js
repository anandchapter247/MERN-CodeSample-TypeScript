/**
 * FUNCTION TO CREATE SLUG
 * THIS WILL TAKE CARE OF EVERY TYPE OF SPECIAL CHARACTERS
 * @param {(slugify(text))}
 * @param {text} string
 */

const slugify = text => {
	const a =
		'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
	const b =
		'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
	const p = new RegExp(a.split('').join('|'), 'g');

	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^\w-]+/g, '') // Remove all non-word characters
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
};

module.exports = slugify;
