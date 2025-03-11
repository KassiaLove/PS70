% Define serial port and baud rate
port = 'COM11';
baudRate = 9600;

% Open serial connection
arduinoObj = serialport(port, baudRate);

i = 1;
while true
    try
        % Read line from serial
        data(:,i) = readline(arduinoObj);
        % Convert to number
        sensorValue = str2double(data);
        % Display the value in the MATLAB console
        fprintf('Sensor Value: %d\n', sensorValue(i));
        % Wait 1 seconds before next reading
        pause(1);
        i = i+1;
    catch
        % Stop if there's an error or connection issue
        disp("Error reading from Arduino. Check connection.");
        break;
    end
end

% Close serial connection
clear arduinoObj;
