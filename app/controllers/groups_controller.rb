class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(name: group_params[:name], user_ids: group_params[:user_ids])
    @group.users << current_user
    if @group.save
      redirect_to "/groups/#{@group.id}/messages", notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
