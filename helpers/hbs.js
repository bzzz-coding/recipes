// for formatting dates
const moment = require('moment')

module.exports = {
  formatDate: function (date, format) {
    return moment(date).utc().format(format)
  },
  // takes in a string and a length, return string cut out to the length and add ...
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + ' '
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(' '))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + '...'
    }
    return str
  },
  // replace any html tags with nothing
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '')
  },
  // takes in recipeUser, user that's logged in, recipe.id, have a floating icon button
  editIcon: function (recipeUser, loggedUser, recipeId, floating = true) {
    if (recipeUser._id.toString() == loggedUser._id.toString()) {
      // checking to see if it's a floating icon/button
      if (floating) {
        return `<a href="/recipes/edit/${recipeId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
      } else {
        return `<a href="/recipes/edit/${recipeId}"><i class="fas fa-edit"></i></a>`
      }
    } else {
      return ''
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp('>' + selected + '</option>'),
        ' selected="selected"$&'
      )
  },
}
