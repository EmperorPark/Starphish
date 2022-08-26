$compress = @{
    LiteralPath= "..\css", "..\images", "..\js", "..\background.js", "..\manifest.json", "..\options.html", "..\popup.html", "..\popup.js"
    CompressionLevel = "Fastest"
    DestinationPath = ".\starPhish.zip"
}
Compress-Archive @compress