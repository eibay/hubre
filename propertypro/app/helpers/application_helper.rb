#global method

module ApplicationHelper

  #my own example of link_to
  def link (label, path)
    #raw is a rails wrapper 
    raw ("<a href='#{path}'> #{label}</a> ")
  end
end