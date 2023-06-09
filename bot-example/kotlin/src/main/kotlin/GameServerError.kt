class GameServerError(val error: Api.Error) : Throwable() {
    override fun getLocalizedMessage() = error.toString()
}
