class ApplicationController < ActionController::API
  before_action :cors_preflight_check, if: proc { Rails.env.development? }
  # before_action :authentication
  after_action :cors_set_access_control_headers

  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    headers['Access-Control-Max-Age'] = "1728000"
  end

  def cors_preflight_check
    if request.method == 'OPTIONS'
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Token, Authorization'
      headers['Access-Control-Max-Age'] = '1728000'

      render :text => '', :content_type => 'text/plain'
    end
  end

  def current_user
    @current_user
  end

  private
    def authentication
      p "authen"
      p request.headers['Authorization']
      begin
        id = JWT.decode(request.headers['Authorization'], ENV['SECRET_KEY_BASE'])[0]['id']
        @current_user = User.find(id)

      rescue JWT::DecodeError
        render json: 'authentication failed', status: 401
      end
    end

    def http_auth_header
      if headers['Authorization'].present?
        return headers['Authorization'].split(' ').last
      end
      nil
    end
end
