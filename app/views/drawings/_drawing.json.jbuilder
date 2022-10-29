json.extract! drawing, :id, :name, :width, :height, :objects, :created_at, :updated_at
json.url drawing_url(drawing, format: :json)
