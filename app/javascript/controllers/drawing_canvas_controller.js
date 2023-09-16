import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

// Connects to data-controller="drawing-canvas"
export default class extends Controller {
  static targets = [ 'canvas' ];
  static values = { drawingId: Number };

  connect() {
    this.canvasCtx = this.canvasTarget.getContext("2d");

    this.subscription = consumer.subscriptions.create(
      { channel: "DrawingCollaborationChannel", drawing_id: this.drawingIdValue },
      { received: this.received.bind(this) }
    );

    this.subscription.perform("fetch_objects");
  }

  disconnect() {
    this.subscription.unsubscribe();
  }

  fetchObjects() {
    this.subscription.perform("fetch_objects");
  }

  received(data) {
    if ("initial_objects" in data) {
      this.initialRender(data.initial_objects)
    }
  }

  initialRender(objects) {
    this.canvasCtx.clearRect(0, 0, this.canvasTarget.width, this.canvasTarget.height);

    objects.forEach(obj => this.renderObject(obj));
  }

  renderObject(object) {
    const ctx = this.canvasCtx
    switch (object.shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(object.x0, object.y0, object.radius, 0, 2 * Math.PI);
        ctx.fillStyle = object.color;
        ctx.fill();
        break;
      default:
        break;
    }
  }
}
