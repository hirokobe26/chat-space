Rails.application.routes.draw do
  devise_for :users
  root "messages#after_login"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :edit, :create,:update] do
    resources :messages, only: [:index, :create]
  end
end
