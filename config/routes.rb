Rails.application.routes.draw do
  root "messages#index"
  get "chat-space" => 'messages/index'
end
