class DrawingCollaborationChannel < ApplicationCable::Channel
  def subscribed
    stream_from(drawing)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def fetch_objects
    transmit({initial_objects: drawing.objects.value})
  end

  private

  def drawing
    return @drawing if defined?(@drawing)

    @drawing = Drawing.find(params[:drawing_id])
  end
end
