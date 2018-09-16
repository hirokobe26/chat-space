class MessagesController < ApplicationController
  before_action :set_group, only: [:index,:create]

  def after_login
    @group = current_user.groups[0]
    @messages = @group.messages.includes(:user)
    @message = Message.new
    render :index
  end

  def index
    @message = Message.new
    respond_to do |format|
      format.html { @messages = @group.messages.includes(:user) }
      format.json { @messages = @group.messages.where(["id > ?", @message_id]) }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    @message_id = params[:message_id]
  end
end
