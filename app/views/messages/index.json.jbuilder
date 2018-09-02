json.array! @messages do |message|
  json.content    message.content
  json.image      message.image.url
  json.group_id   message.group.id
  json.user_id    message.user.id
  json.user_name  message.user.name
  json.created_at message.created_at.to_s
end
